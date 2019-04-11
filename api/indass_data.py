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
# Description : dashboard数据接口模块

import ast
from flask import jsonify
from flask import request
import config
from flask.views import MethodView
import SQLSentence


class DataView(MethodView):
    def get(self, username, project_id, data_marker):
        # 1 获取参数
        param_dict = request.args
        if not param_dict:
            return jsonify(errno=1, errmsg="获取参数为空!")
        try:
            client_id = param_dict["client_id"]
            password = param_dict["password"]
        except Exception as e:
            print("获取用户名或密码失败:%s" % e)
            return jsonify(errno=2, errmsg="获取参数出错!")

        # 2 验证参数
        if not all([username, project_id, password, client_id, data_marker]):
            return jsonify(errno=3, errmsg="参数不完整!")
        if data_marker not in config.Config.DATA_API_PARAM_LIST:
            return jsonify(errno=4, errmsg="请求地址错误!")
        # 2.1 验证用户名及密码
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
        except Exception as e:
            print("数据库连接错误:%s" % e)
            return jsonify(errno=5, errmsg="数据库连接错误!")
        try:
            cursor.execute(SQLSentence.DATA_SQL_01, [username, password])
            result = cursor.fetchall()
        except Exception as e:
            print("用户名或密码错误:%s" % e)
            return jsonify(errno=6, errmsg="用户名或密码错误!")
        conn.close()
        cursor.close()
        if not result:
            return jsonify(errno=7, errmsg="用户名或密码错误")
        # 2.2　验证项目名称
        try:
            conn = config.Config.conn()
            cursor = conn.cursor()
        except Exception as e:
            print("数据库连接错误:%s" % e)
            return jsonify(errno=5, errmsg="数据库连接错误!")
        try:
            cursor.execute(SQLSentence.DATA_SQL_02, [project_id])
            new_project_id = cursor.fetchall()[0][0]
        except Exception as e:
            print("该分析项目未创建:%s" % e)
            return jsonify(errno=8, errmsg="该分析项目未创建！")
        if not new_project_id:
            return jsonify(errno=9, errmsg="该分析项目未创建！")
        # 2.3 验证client_id
        try:
            cursor.execute(SQLSentence.DATA_SQL_03, [client_id])
            db_project_id = cursor.fetchall()[0][0]
        except Exception as e:
            print(e)
            return jsonify(errno=10, errmsg="设备编号错误！")
        if db_project_id != project_id:
            return jsonify(errno=11, errmsg="设备编号错误！")

        # 3 处理业务逻辑(indass数据处理,返回最新的一条数据给用户)
        combine_queue_name = 'hset:CombineQ:%s:%s' % (project_id, client_id)
        # 获取最新一条combine数据
        try:
            keys_list = config.Config.REDIS_CONN.hkeys(combine_queue_name)
            data_block_id = max(keys_list)
            combine_data = config.Config.REDIS_CONN.hget(combine_queue_name, data_block_id)
        except Exception as e:
            print("获取combine数据错误:%s" % e)
            return jsonify(errno=12, errmsg="获取combine数据错误！")
        combine_data = ast.literal_eval((combine_data.decode("utf-8")))
        if not combine_data:
            return jsonify(errno=13, errmsg="combine数据为空！")
        # 4 返回结果
        if data_marker == "all":
            return jsonify(errno=0, errmsg="succeed", data=combine_data)
        elif data_marker == "map":
            send_data = dict()
            send_data["Map"] = combine_data["Map"]
            send_data["Parm_CN"] = combine_data["Parm_CN"]
            send_data["Parm_EN"] = combine_data["Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        elif data_marker == "risk":
            send_data = dict()
            send_data["Risk"] = combine_data["Risk"]
            send_data["Parm_CN"] = combine_data["Parm_CN"]
            send_data["Parm_EN"] = combine_data["Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        elif data_marker == "tend":
            send_data = dict()
            send_data["Tend"] = combine_data["Tend"]
            send_data["Parm_CN"] = combine_data["Parm_CN"]
            send_data["Parm_EN"] = combine_data["Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        elif data_marker == "stab":
            send_data = dict()
            send_data["Stab"] = combine_data["Stab"]
            send_data["Parm_CN"] = combine_data["Parm_CN"]
            send_data["Parm_EN"] = combine_data["Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        elif data_marker == "index":
            send_data = dict()
            send_data["Indx"] = combine_data["Indx"]
            send_data["Parm_CN"] = combine_data["Parm_CN"]
            send_data["Parm_EN"] = combine_data["Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        elif data_marker == "opti":
            send_data = dict()
            send_data["Opt_One"] = combine_data["Opt_One"]
            send_data["Opt_Parm_CN"] = combine_data["Opt_Parm_CN"]
            send_data["Opt_Parm_EN"] = combine_data["Opt_Parm_EN"]
            return jsonify(errno=0, errmsg="succeed", data=send_data)
        else:
            return jsonify(errno=14, errmsg="请求的url错误！")
