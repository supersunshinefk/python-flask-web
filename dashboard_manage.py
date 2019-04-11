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
# Description : dashboard主程序入口模块

import config
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect
from flask_script import Manager
from flask import render_template
from flask import session
from flask import redirect
from flask import url_for

from api.indass_analyze import AnalyzeView
from api.indass_data import DataView
from api.indass_user import LoginView, LogoutView, HomeView
from api.indass_select import SelectView

app = Flask(__name__, static_folder=config.Config.STATIC_PATH, static_url_path='')
manager = Manager(app)

app.config['SECRET_KEY'] = config.Config.SECRET_KEY
csrf = CSRFProtect(app)
app.config.from_object(config.config["development"])
limiter = Limiter(app, key_func=get_remote_address, default_limits=["200 per minute"])

app.add_url_rule("/", view_func=HomeView.as_view("homeview"))
login_view = limiter.limit("12 per minute")(LoginView.as_view("loginview"))
app.add_url_rule("/login", view_func=login_view)
app.add_url_rule("/logout", view_func=LogoutView.as_view("logoutview"))
app.add_url_rule("/select/<username>", view_func=SelectView.as_view("selectview"))
app.add_url_rule("/<username>/<project_id>/<data_marker>", view_func=AnalyzeView.as_view("analyzeview"))
data_view = limiter.limit("12 per minute")(DataView.as_view("dataview"))
app.add_url_rule("/api/v1.0/<username>/<project_id>/<data_marker>", view_func=data_view)


@app.errorhandler(404)
def error(e):
    return render_template("404.html")


@app.errorhandler(500)
def error(e):
    try:
        username = session["username"]
    except Exception as err:
        print(err)
        return redirect(url_for("loginview"))
    return render_template("500.html", username=username)


if __name__ == '__main__':
    # print(app.url_map)
    # manager.run()
    app.run(host="0.0.0.0", port=9001)
