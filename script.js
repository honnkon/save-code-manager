$(function() {
	"use strict";
	const api_url = `https://script.google.com/macros/s/AKfycbzTZL02kp5i5SVY7TRDAxlTIW7zaUlRyaTVONzcI0cyHGNbe35vHFOj1ac1yVKA2Id8OA/exec`;
	$("form[name=view]").on('submit',()=>{
	    $("textarea#get_savedata").text("データ取得中...");
	    fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`showcode=${$("#show_showcode").val()}&savecode=none&password=none&requestType=get`)
        })
        .then((response) => {
            response.json().then((json) => {
                if(json.data == undefined){
                    $("textarea#get_savedata").text("見つかりませんでした。");
                } else {
                    $("textarea#get_savedata").text(json.data);
                }
            });
        })
        .catch((error) => {
            $("textarea#get_savedata").text("エラーが発生しました。詳しくはブラウザコンソールをご覧ください。");
            console.error(error.message);
        });
        return false;
	});
	
	$("form[name=save]").on('submit',()=>{
	    $("#save_response").text("データ保存中...");
	    fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`showcode=${$("#save_showcode").val()}&savecode=${$("#save_savecode").val()}&password=${$("#save_password").val()}&requestType=save`)
        })
        .then((response) => {
            response.json().then((json) => {
                if(json.message == "Vaild data"){
                    $("#save_response").text("情報が欠落しています。もう一度試すか、すべて入力してからもう一度試してください。");
                } else if(json.message == "There is a same data"){
                    $("#save_response").text("同じ閲覧コードがあります。別のコードを入力してください。");
                } else {
                    $("#save_response").html(`成功しました。↓共有用<br/><textarea readonly>閲覧コード：${$("#save_showcode").val()}\nこれは、パスワードマネージャー（ https://ou7t5e8v81obixbdmelziw.on.drv.tw/site/save-code-manager/ or https://honnkon.github.io/save-code-manager/ ）で利用できるコードです。</textarea>`);
                }
            });
        })
        .catch((error) => {
            $("#save_response").text("エラーが発生しました。詳しくはブラウザコンソールをご覧ください。");
            console.error(error.message);
        });
        return false;
	});
	
	$("form[name=change]").on('submit',()=>{
	    $("#change_response").text("データ変更中...");
	    fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`showcode=${$("#change_showcode").val()}&savecode=${$("#change_savecode").val()}&password=${$("#change_password").val()}&requestType=change`)
        })
        .then((response) => {
            response.json().then((json) => {
                if(json.message == "Vaild data"){
                    $("#change_response").text("情報が欠落しています。もう一度試すか、すべて入力してからもう一度試してください。");
                } else if(json.message == "There is no same data"){
                    $("#change_response").text("入力した閲覧コードは見つかりませんでした。");
                } else if(json.message == "Vaild password"){
                    $("#change_response").text("パスワードが正しくありません。");
                } else {
                    $("#change_response").text(`成功しました。`);
                }
            });
        })
        .catch((error) => {
            $("#change_response").text("エラーが発生しました。詳しくはブラウザコンソールを見てください。");
            console.error(error.message);
        });
        return false;
	});
});
