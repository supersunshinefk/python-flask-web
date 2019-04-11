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
# Description : dashboard配置模块

import pymysql
import redis
import os


class Config:
    # csrf验证参数
    CSRF_ENABLED = True
    SECRET_KEY = 'guess-what'

    # redis配置文件
    REDIS_HOST = '192.168.88.16'
    REDIS_PORT = 6379
    REDIS_PWD = 'mixlinker@888'
    REDIS_DB = 0
    REDIS_CONN = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PWD, db=REDIS_DB)

    # translink
    WEBSOCKET_URL_a = 'emiot.cnpc.com.cn:8004/indass'
    WEBSOCKET_URL_b = 'ws://'
    WEBSOCKET_URL = WEBSOCKET_URL_b + WEBSOCKET_URL_a
    # WEBSOCKET_URL = "ws://192.168.88.16:7379/.json"
    # WEBSOCKET_URL = "ws://dashboard.indass.top:7379/.json"

    STATIC_PATH = os.getcwd() + '/static/'

    ANALYZE_API_PARAM_LIST = ["risk", "tend", "stab", "index"]
    DATA_API_PARAM_LIST = ["all", "map", "risk", "tend", "stab", "index", "opti"]

    @staticmethod
    def conn():
        mysql_host = "192.168.88.16"
        mysql_user = 'root'
        mysql_db = 'indass_boss'
        mysql_password = 'passw0rd'
        mysql_port = 3306
        mysql_charset = "UTF8"
        connect = pymysql.connect(host=mysql_host, user=mysql_user, db=mysql_db, passwd=mysql_password,
                                  port=mysql_port, charset=mysql_charset)
        return connect


class DevelopmentConfig(Config):
    """开发模式的配置参数"""
    DEBUG = True


class ProductionConfig(Config):
    """生产环境的配置参数"""
    pass


config = {
    "development": DevelopmentConfig,  # 开发模式
    "production": ProductionConfig  # 生产/线上模式
}
