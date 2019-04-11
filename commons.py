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
# Description : dashboard公共模块

from flask import abort
from flask import url_for, session
from flask import redirect
from flask import request
from functools import wraps
import config
import SQLSentence


def login_req(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        try:
            username = session['username']
            password = session['password']
        except Exception as e:
            print("用户未登陆：%s" % e)
            return redirect(url_for('loginview', next=request.url))
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.COMMONS_SQL_01, [username, password])
            result = cursor.fetchall()
            cursor.close()
            conn.close()
        except Exception as e:
            print("用户未登陆：%s" % e)
            return redirect(url_for('loginview', next=request.url))
        if not result:
            return redirect(url_for('loginview', next=request.url))
        return func(*args, **kwargs)

    return decorated_function


def url_verification(func):
    def decorated_function(*args, **kwargs):
        url = request.url
        url_list = url.split("/")
        try:
            data_marker = url_list[-1]
            project_id = url_list[-2]
            url_user_name = url_list[-3]
        except Exception as e:
            print("输入的地址有误：%s" % e)
            abort(404)
            return
        if not all([data_marker, project_id, url_user_name]):
            abort(404)
        if data_marker not in config.Config.ANALYZE_API_PARAM_LIST:
            abort(404)
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.COMMONS_SQL_02, [project_id])
            result = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("该项目或用户不存在：%s" % e)
            abort(404)
            return
        if url_user_name != result:
            abort(404)
        try:
            username = session["username"]
        except Exception as e:
            print("用户未登录：%s" % e)
            return redirect(url_for('loginview', next=request.url))
        if username != url_user_name:
            return redirect(url_for('loginview', next=request.url))
        return func(*args, **kwargs)

    return decorated_function
