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
# Description : dashboard分析项目选择模块

from flask import abort
from flask import redirect
from flask import render_template
from flask import request
from flask import session
from flask import url_for
import config
import SQLSentence
from commons import login_req
from flask.views import MethodView


class SelectView(MethodView):
    decorators = [login_req]

    def __init__(self):
        self.my_id = None

    def get(self, username):
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.SELECT_SQL_01, [username])
            self.my_id = cursor.fetchall()[0][0]
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)
            abort(404)
        try:
            old_username = session['username']
        except Exception as e:
            print("界面用户未登录：%s" % e)
            return redirect(url_for('loginview', next=request.url))
        if username != old_username:
            return redirect(url_for('loginview', next=request.url))
        project_list = []
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
            cursor.execute(SQLSentence.SELECT_SQL_02, [self.my_id])
            values = cursor.fetchall()
            for project_tuple in values:
                project_list.append(project_tuple)
            cursor.close()
            conn.close()
        except Exception as e:
            print("查询数据库错误：%s" % e)

        return render_template("project_list.html", project_list=project_list, username=username)
