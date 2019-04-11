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
# Date : 2018-06-20
# Author : 张色艺
# Description : dashboard mysql查询语句模块

# indass_user_sql
USER_SQL_01 = "select account_login, account_pin from boss_account where account_login = %s and account_pin = %s;"
USER_SQL_02 = "select A.account_login from boss_account as A right join boss_analytic_project as B " \
              "on A.id = B.project_account_id where B.project_id = %s;"
USER_SQL_03 = "select account_login, account_pin from boss_account where account_login = %s and account_pin = %s;"

# indass_select_sql
SELECT_SQL_01 = "select id from boss_account where account_login = %s;"
SELECT_SQL_02 = "select project_name, project_id from boss_analytic_project where project_account_id = %s;"

# indass_analyze_sql
ANALYZE_SQL_01 = "select account_login from boss_account where account_login = %s;"
ANALYZE_SQL_02 = "select project_name from boss_analytic_project where project_id = %s;"
ANALYZE_SQL_03 = "select project_account_id from boss_analytic_project where project_name = %s;"
ANALYZE_SQL_04 = "select account_name, account_login from boss_account where id = %s;"
ANALYZE_SQL_05 = "select project_obj_group_id from boss_analytic_project where project_name = %s;"
ANALYZE_SQL_06 = "select obj_group_name from boss_object_group where id = %s;"
ANALYZE_SQL_07 = "select object_id from boss_object where obj_group_id_id = %s;"

# indass_data_sql
DATA_SQL_01 = "select account_login, account_pin from boss_account where account_login = %s and account_pin = %s;"
DATA_SQL_02 = "select project_id from boss_analytic_project where project_id = %s;"
DATA_SQL_03 = "select A.project_id from boss_analytic_project as A right join boss_object as B " \
              "on A.project_obj_group_id = B.obj_group_id_id where B.object_id = %s;"

# commons_sql
COMMONS_SQL_01 = "select account_login, account_pin from boss_account where account_login = %s and account_pin = %s;"
COMMONS_SQL_02 = "select A.account_login from boss_account as A right join boss_analytic_project as B " \
                 "on A.id = B.project_account_id where B.project_id = %s;"
