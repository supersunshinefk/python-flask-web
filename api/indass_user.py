###############################################################################
# Copyright (c) 2014-2018 Mixlinker Networks Inc. <mixiot@mixlinker.com>
# All rights reserved.
#
# This program and the accompanying materials are made available under the
# terms of the Application License of Mixlinker Networks License and Mixlinker
# Distribution License which accompany this distribution.
#
# The Mixlinker License is available at
#    http://www.mixlinker.com/legal/license.html
# and the Mixlinker Distribution License is available at
#    http://www.mixlinker.com/legal/distribution.html
#
# Contributors:
#    Mixlinker Technical Team
###############################################################################
# Date : 2018-06-07
# Author : 张色艺
# Description : dashboard登录模块

import re
from flask import abort
from flask import render_template, request
from flask import jsonify, session
from flask import redirect
from flask import url_for
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired
import config
from flask.views import MethodView
import SQLSentence


class DataForm(FlaskForm):
    user = StringField('user', validators=[DataRequired()],
                       render_kw={"id": "username", "placeholder": "请输入用户名"})
    submit = SubmitField('Submit', validators=[DataRequired()],
                         render_kw={"class": "f_l login_indass_btn", "value": "登 录"})
    password = PasswordField('password', validators=[DataRequired()],
                             render_kw={"id": "password", "placeholder": "请输入密码"})


class LoginView(MethodView):
    def __init__(self):
        self.param_list = None
        self.variate = None

    def get(self):
        form_table = DataForm()
        # 获取next的值
        indass_next = request.args.get("next")
        # 判断是否从其他页面跳转过来的
        if indass_next:
            session['indass_next'] = indass_next

        return render_template("login.html", form=form_table)

    def post(self):
        # 获取session中的next值
        try:
            indass_next = session['indass_next']
        except Exception as e:
            # 获取next值发生错误时，把indass_next设置为None
            indass_next = None
        form_table = DataForm()
        username = form_table.user.data
        password = form_table.password.data

        if not all([username, password]):
            return jsonify(errno=1, errmsg="参数不完整！")

        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
        except Exception as e:
            print("数据库连接错误:%s" % e)
            return jsonify(errno=2, errmsg="数据库连接错误!")

        try:
            cursor.execute(SQLSentence.USER_SQL_01, [form_table.user.data, form_table.password.data])
            result = cursor.fetchall()
        except Exception as e:
            print(e)
            return jsonify(errno=3, errmsg="用户名或密码错误!")
        cursor.close()
        conn.close()

        if not result:
            return jsonify(errno=4, errmsg="用户名或密码错误!")
        account_password = result[0][1]

        if not account_password:
            return jsonify(errno=5, errmsg="用户名或密码错误！")

        if password != account_password:
            return jsonify(errno=6, errmsg="用户名或密码错误！")

        session['username'] = username
        session['password'] = password

        if indass_next:
            try:
                self.param_list = re.findall(r'\/\/.+', indass_next)
                self.param_list = self.param_list[0].strip("//").split("/")
            except Exception as e:
                print(e)
                session.pop('indass_next', None)
                abort(404)
            if len(self.param_list) != 4:
                session.pop('indass_next', None)
                return redirect(url_for("loginview"))
            try:
                self.variate = self.param_list[1]
            except Exception as e:
                print(e)
                session.pop('indass_next', None)
                abort(404)
            data_marker = self.param_list[-1]
            if data_marker not in config.Config.ANALYZE_API_PARAM_LIST:
                data = {"username": username}
                session.pop('indass_next', None)
                return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)
            data_project_id = self.param_list[-2]

            if self.param_list[-3] != username:
                data = {"username": username}
                session.pop('indass_next', None)
                return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)

            try:
                conn = config.Config.conn()
                cursor = conn.cursor()
                cursor.execute(SQLSentence.USER_SQL_02, [data_project_id])
                db_username = cursor.fetchall()[0][0]
            except Exception as e:
                print(e)
                data = {"username": username}
                session.pop('indass_next', None)
                return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)
            conn.close()
            cursor.close()

            if username != db_username:
                data = {"username": username}
                session.pop('indass_next', None)
                return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)

            if self.variate != username:
                data = {"username": username}
                session.pop('indass_next', None)
                return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)

            data = {"indass_next": indass_next}
            session.pop('indass_next', None)
            return jsonify(errno=7, errmsg="登录成功, 跳转回next页面！", data=data)
        else:
            data = {"username": username}
            return jsonify(errno=0, errmsg="登录成功，跳转到select页面！", data=data)


class LogoutView(MethodView):
    def get(self):
        session.pop('username', None)
        session.pop('password', None)
        session.pop('indass_next', None)
        return redirect(url_for('loginview'))


class HomeView(MethodView):
    def get(self):
        try:
            username = session['username']
            password = session['password']
        except Exception as e:
            print("用户未登录：%s" % e)
            return redirect(url_for('loginview'))

        if not all([username, password]):
            return redirect(url_for('loginview'))
        conn = config.Config.conn()
        cursor = conn.cursor()
        try:
            cursor.execute(SQLSentence.USER_SQL_03, [username, password])
        except Exception as e:
            print('查询数据库失败:%s' % e)
        data = cursor.fetchall()
        cursor.close()
        conn.close()
        if not data:
            return redirect(url_for('loginview'))
        return redirect(url_for('selectview', username=username))
