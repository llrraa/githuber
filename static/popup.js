/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-23 14:26:31
 */

'use strict';

/* eslint-disable */

var form = {};
var $title = $('#title');
var $url = $('#url');
var $img = $('#img');
var $button = $('#button');
var $notification = $('#notification');

chrome.tabs.getSelected(null, function(tab) {
    $title.val(tab.title);
    $url.val(tab.url);
    $img.html('<img src="' + tab.favIconUrl + '">')
});

$button.on('click', function() {
    var name = $title.val();
    var url = $url.val();

    if (!name) {
        return $('#titleError').show();
    }
    if (!url) {
        return $('#urlError').show();
    }

    chrome.runtime.sendMessage({
		name: 'add',
		message: {
            id: chrome.runtime.id,
            name: name,
            url: url,
            logo: $img.find('img').attr('src') || '',
        }
	}, function(o) {
		$notification.addClass('show');
	});
});
