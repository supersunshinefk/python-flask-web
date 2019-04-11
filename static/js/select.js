/**
 * Copyright (c) 2014-2018 Mixlinker Networks Inc. <mixiot@mixlinker.com>
 * All rights reserved.
 */

/**
 * Created by python on 18-4-29.
 */

$(document).ready(function () {
    $('select').niceSelect();


    $.get("/info", function (resp) {
        var my_div = $(".wide");
        if ("0" == resp.errno) {

            for (var i = 0; i < resp.data["project_name_list"].length; i++) {
                // <option value="862631039219935">Device ID: 862631039219935</option>

                my_div.append('<option id="option" value="' + resp.data["project_name_list"][i] + '">Device ID: ' + resp.data["project_name_list"][i] + '</option>')

            }
        }
        else if ("1" == resp.errno) {
            alert(resp.errmsg);
            location.href = "/login.html"
        }
        else if ("2" == resp.errno) {
            alert(resp.errmsg)
        }
        else if ("3" == resp.errno) {
            alert(resp.errmsg)
        }
    }, "json");


    $('#indass_form').submit(function (e) {
        e.preventDefault();
        var formData = {"project_name": $("#option").val()};
        $.ajax({
            type: "POST",
            url: "/select",

            data: formData,

            beforeSend: function () {
                $("#login-submit").attr("disabled", true);//提交表单前的处理，防止用户多次点击【登录】，重复提交表单
                $("#login-submit").val("ok");
            },
            success: function (msg) {
                if (msg.errno == 0) {
                    // alert("跳转index成功！！");
                    location.href = '/index.html';
                }
                else if (msg.errno == 1) {
                    alert(msg.errmsg);
                    location.href = "/login.html"
                }
                else if (msg.errno == 2) {
                    alert(msg.errmsg);
                }
                else if (msg.errno == 3) {
                    alert(msg.errmsg);
                }
                else if (msg.errno == 4) {
                    alert(msg.errmsg);
                    location.href = "/login.html"
                }
            }
        });

    });
});




