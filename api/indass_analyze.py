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
# Description : dashboard的risk, tend, stab, index四个分析页面模块

from flask import abort
from flask import render_template
from flask import request
from flask import session, redirect
from flask import url_for
import config
from commons import login_req, url_verification
from flask.views import MethodView
import SQLSentence


class AnalyzeView(MethodView):
    decorators = [login_req, url_verification]

    def __init__(self):
        self.result = None
        self.project_name = None
        self.project_account_id = None
        self.account_tuple = None
        self.project_obj_group_id = None
        self.obj_group_name = None

    def get(self, username, project_id, data_marker):
        # 1.获取参数
        # 判断用户是否登录
        try:
            old_username = session['username']
        except Exception as e:
            print("界面用户未登录：%s" % e)
            return redirect(url_for('loginview', next=request.url))
        if not all([username, project_id, data_marker, old_username]):
            abort(404)
        if data_marker not in config.Config.ANALYZE_API_PARAM_LIST:
            abort(404)
        # 判断输入的用户名是否在数据库里面
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_01, [username])
            self.result = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print(e)
            abort(404)

        # 输入的用户名正确但是跟session保存的用户名不一致，要用户重新登录
        if old_username != self.result:
            return redirect(url_for('loginview', next=request.url))
        # 输入的用户名错误
        if old_username != username:
            abort(404)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_02, [project_id])
            self.project_name = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("用户id输入错误：%s" % e)
            abort(404)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_03, [self.project_name])
            self.project_account_id = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_04, [self.project_account_id])
            self.account_tuple = cursor.fetchall()[0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_05, [self.project_name])
            self.project_obj_group_id = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_06, [self.project_obj_group_id])
            self.obj_group_name = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)
        object_id_list = []
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.ANALYZE_SQL_07, [self.project_obj_group_id])
            values = cursor.fetchall()
            for object_id_tuple in values:
                object_id_list.append(object_id_tuple[0])
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)

        if data_marker == "index":
            return render_template("index.html", account_tuple=self.account_tuple, username=username,
                                   websocket_url=config.Config.WEBSOCKET_URL, object_id_list=object_id_list,
                                   obj_group_name=self.obj_group_name, project_id=project_id)
        elif data_marker == "stab":
            return render_template("stab.html", account_tuple=self.account_tuple, username=username,
                                   websocket_url=config.Config.WEBSOCKET_URL, object_id_list=object_id_list,
                                   obj_group_name=self.obj_group_name,
                                   project_id=project_id)
        elif data_marker == "tend":
            return render_template("tend.html", account_tuple=self.account_tuple, username=username,
                                   websocket_url=config.Config.WEBSOCKET_URL, object_id_list=object_id_list,
                                   obj_group_name=self.obj_group_name, project_id=project_id)
        elif data_marker == "risk":
            return render_template("risk.html", account_tuple=self.account_tuple, username=username,
                                   websocket_url=config.Config.WEBSOCKET_URL, object_id_list=object_id_list,
                                   obj_group_name=self.obj_group_name, project_id=project_id)
        else:
            abort(404)
