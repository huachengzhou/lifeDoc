/** codejson.com-v1.0.0 ISC License By https://www.codejson.com */
;var _0x11ff = ['show', 'JSON格式不正确。', 'error:\x20', 'escapezip', '#delescape', 'union2zh_cn', 'cnchar2enchar', '#copy', 'copy', 'extend', 'codejson', 'define', 'layer', 'editor', 'util', 'fromTextArea', 'getElementById', 'code', 'layui.com', 'open', '250px;', '残忍拒绝', '<div\x20style=\x22padding:\x2040px;\x20line-height:\x2022px;\x20background-color:\x20#009688;\x20color:\x20#fff;letter-spacing:1px;\x20font-weight:\x20300;\x22>欢迎来自Layui的朋友！<br><br>\x20本站是一个无广告清爽的Json格式化工网站，如果您觉得好用，请加个收藏吧\x20^_^\x20<br><br>\x20或者您也可以在Layui年度案例里帮我点个赞吧^_^</div>', 'close', 'msg', '感谢您的支持\x20^_^', 'jsonformat', 'getValue', 'split', 'length', 'charAt', 'push', 'join', 'replace', 'toLocaleLowerCase', '什么都没有让我怎么解析嘛\x20o(╥﹏╥)o', 'GB2312UnicodeConverter', 'trim', 'ToUnicode', 'setValue', 'data', 'index', 'click', '#code', 'val', 'beautify_default', 'parse', 'object', '.intotext', 'html', '正确的JSON格式。', 'removeClass', 'error', 'addClass', 'sucess'];
(function (_0x2699a9, _0x501e82) {
    var _0x5b6c40 = function (_0xa3de42) {
        while (--_0xa3de42) {
            _0x2699a9['push'](_0x2699a9['shift']());
        }
    };
    _0x5b6c40(++_0x501e82);
}(_0x11ff, 0xae));
var _0x1264 = function (_0x2abcc2, _0x29d0dc) {
    _0x2abcc2 = _0x2abcc2 - 0x0;
    var _0x1b50c5 = _0x11ff[_0x2abcc2];
    return _0x1b50c5;
};
layui[_0x1264('0x0')]({'com': _0x1264('0x1')})[_0x1264('0x2')]([_0x1264('0x3'), _0x1264('0x1'), _0x1264('0x4'), _0x1264('0x5')], function (_0x4039e5) {
    var _0x5a7a0a = layui['codejson'], _0x22ef77 = $[_0x1264('0x0')]({}, _0x5a7a0a['editor_default']),
        _0xd40505 = CodeMirror[_0x1264('0x6')](document[_0x1264('0x7')](_0x1264('0x8')), _0x22ef77);
    -0x1 < document['referrer']['indexOf'](_0x1264('0x9')) && layer[_0x1264('0xa')]({
        'type': 0x1,
        'shade': 0.1,
        'title': !0x1,
        'closeBtn': !0x1,
        'area': _0x1264('0xb'),
        'id': 'LAY_layuipro',
        'btn': ['我已支持', _0x1264('0xc')],
        'btnAlign': 'c',
        'moveType': 0x1,
        'content': _0x1264('0xd'),
        'yes': function (_0x4039e5) {
            layer[_0x1264('0xe')](_0x4039e5), layer[_0x1264('0xf')](_0x1264('0x10'));
        }
    }), _0x4039e5(_0x1264('0x11'), {
        'escapezip': function (_0x4039e5) {
            var _0x22ef77 = _0xd40505[_0x1264('0x12')]();
            if (!_0x22ef77) return layer[_0x1264('0xf')]('什么都没有让我怎么解析嘛\x20o(╥﹏╥)o', {'anim': 0x6}), !0x1;
            if (0x1 == _0x4039e5 || 0x3 == _0x4039e5) {
                for (var _0x478fe3 = [], _0x5a7a0a = !0x1, _0x5a8ea7 = 0x0, _0xce98fe = (_0x22ef77 = _0x22ef77[_0x1264('0x13')]('\x0a')['join']('\x20'))[_0x1264('0x14')]; _0x5a8ea7 < _0xce98fe; _0x5a8ea7++) {
                    var _0x373014 = _0x22ef77[_0x1264('0x15')](_0x5a8ea7);
                    _0x5a7a0a && _0x373014 === _0x5a7a0a ? '\x5c' !== _0x22ef77[_0x1264('0x15')](_0x5a8ea7 - 0x1) && (_0x5a7a0a = !0x1) : _0x5a7a0a || '\x22' !== _0x373014 && '\x27' !== _0x373014 ? _0x5a7a0a || '\x20' !== _0x373014 && '\x09' !== _0x373014 || (_0x373014 = '') : _0x5a7a0a = _0x373014, _0x478fe3[_0x1264('0x16')](_0x373014);
                }
                _0x22ef77 = _0x478fe3[_0x1264('0x17')]('');
            }
            0x2 != _0x4039e5 && 0x3 != _0x4039e5 || (_0x22ef77 = _0x22ef77[_0x1264('0x18')](/\\/g, '\x5c\x5c')['replace'](/\"/g, '\x5c\x22')), 0x4 == _0x4039e5 && (_0x22ef77 = _0x22ef77['replace'](/\\\\/g, '\x5c')['replace'](/\\\"/g, '\x22')), _0xd40505['setValue'](_0x22ef77);
        }, 'GB2312UnicodeConverter': {
            'ToUnicode': function (_0x4039e5) {
                return escape(_0x4039e5)[_0x1264('0x19')]()['replace'](/%u/gi, '\x5cu')['replace'](/%7b/gi, '{')[_0x1264('0x18')](/%7d/gi, '}')[_0x1264('0x18')](/%3a/gi, ':')[_0x1264('0x18')](/%2c/gi, ',')[_0x1264('0x18')](/%27/gi, '\x27')[_0x1264('0x18')](/%22/gi, '\x22')[_0x1264('0x18')](/%5b/gi, '[')['replace'](/%5d/gi, ']')[_0x1264('0x18')](/%3D/gi, '=')[_0x1264('0x18')](/%20/gi, '\x20')[_0x1264('0x18')](/%3E/gi, '>')[_0x1264('0x18')](/%3C/gi, '<')[_0x1264('0x18')](/%3F/gi, '?');
            }, 'ToGB2312': function (_0x4039e5) {
                return unescape(_0x4039e5[_0x1264('0x18')](/\\u/gi, '%u'));
            }
        }, 'union2zh_cn': function () {
            var _0x4039e5 = _0xd40505['getValue']();
            if (!_0x4039e5) return layer['msg'](_0x1264('0x1a'), {'anim': 0x6}), !0x1;
            var _0x22ef77 = this[_0x1264('0x1b')]['ToGB2312'](_0x4039e5);
            _0xd40505['setValue'](_0x22ef77);
        }, 'zh_cn2union': function () {
            var _0x4039e5 = _0xd40505[_0x1264('0x12')]()[_0x1264('0x1c')]();
            if (!_0x4039e5) return layer['msg'](_0x1264('0x1a'), {'anim': 0x6}), !0x1;
            var _0x22ef77 = this[_0x1264('0x1b')][_0x1264('0x1d')](_0x4039e5);
            _0xd40505[_0x1264('0x1e')](_0x22ef77);
        }, 'cnchar2enchar': function () {
            var _0x4039e5 = _0xd40505[_0x1264('0x12')]();
            _0x4039e5 = (_0x4039e5 = (_0x4039e5 = _0x4039e5[_0x1264('0x18')](/\’|\‘/g, '\x27')['replace'](/\“|\”/g, '\x22'))['replace'](/\【/g, '[')['replace'](/\】/g, ']')[_0x1264('0x18')](/\｛/g, '{')[_0x1264('0x18')](/\｝/g, '}'))[_0x1264('0x18')](/，/g, ',')[_0x1264('0x18')](/：/g, ':'), _0xd40505['setValue'](_0x4039e5);
        }, 'init': function () {
            var _0x4039e5 = this, _0x22ef77 = layui[_0x1264('0x1f')](_0x1264('0x1f'))[_0x1264('0x20')];
            _0x22ef77 && _0xd40505['setValue'](_0x22ef77), $('#format')[_0x1264('0x21')](function () {
                var _0x4039e5 = _0xd40505 ? _0xd40505[_0x1264('0x12')]() : $(_0x1264('0x22'))[_0x1264('0x23')]();
                if (!_0x4039e5) return layer[_0x1264('0xf')](_0x1264('0x1a'), {'anim': 0x6}), !0x1;
                var _0x22ef77 = js_beautify(_0x4039e5, _0x5a7a0a[_0x1264('0x24')]);
                _0xd40505 ? _0xd40505[_0x1264('0x1e')](_0x22ef77) : $(_0x1264('0x22'))['val'](_0x22ef77);
                try {
                    var _0x136ac3 = JSON[_0x1264('0x25')](_0x4039e5);
                    _0x1264('0x26') == typeof _0x136ac3 && _0x136ac3 ? ($(_0x1264('0x27'))[_0x1264('0x28')](_0x1264('0x29')), $(_0x1264('0x27'))[_0x1264('0x2a')](_0x1264('0x2b'))[_0x1264('0x2c')](_0x1264('0x2d'))[_0x1264('0x2e')]()) : ($(_0x1264('0x27'))[_0x1264('0x28')](_0x1264('0x2f')), $('.intotext')[_0x1264('0x2a')](_0x1264('0x2d'))[_0x1264('0x2c')](_0x1264('0x2b'))['show']());
                } catch (_0x18a637) {
                    $('.intotext')[_0x1264('0x28')](_0x1264('0x30') + _0x18a637['message']), $(_0x1264('0x27'))[_0x1264('0x2a')](_0x1264('0x2d'))[_0x1264('0x2c')](_0x1264('0x2b'))[_0x1264('0x2e')]();
                }
                layui[_0x1264('0x1f')](_0x1264('0x1f'), {'key': _0x1264('0x20'), 'value': _0x22ef77});
            }), $('#compression')[_0x1264('0x21')](function () {
                _0x4039e5['escapezip'](0x1);
            }), $('#escape')[_0x1264('0x21')](function () {
                _0x4039e5[_0x1264('0x31')](0x2);
            }), $(_0x1264('0x32'))[_0x1264('0x21')](function () {
                _0x4039e5[_0x1264('0x31')](0x4);
            }), $('#un2cn')['click'](function () {
                _0x4039e5[_0x1264('0x33')]();
            }), $('#cn2enchar')['click'](function () {
                _0x4039e5[_0x1264('0x34')]();
            }), $(_0x1264('0x35'))[_0x1264('0x21')](function () {
                var _0x4039e5 = _0xd40505['getValue']();
                _0x5a7a0a[_0x1264('0x36')](_0x1264('0x35'), _0x4039e5);
            }), $('#clear')['click'](function () {
                _0xd40505['setValue']('');
            });
        }
    });
});