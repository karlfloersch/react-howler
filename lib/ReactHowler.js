'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _howler3 = require('./howler');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHowler = function (_Component) {
  _inherits(ReactHowler, _Component);

  function ReactHowler(props) {
    _classCallCheck(this, ReactHowler);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactHowler).call(this, props));

    _this.initHowler = _this.initHowler.bind(_this);
    return _this;
  }

  _createClass(ReactHowler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initHowler();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.src !== this.props.src) {
        this.initHowler(props);
      }
      this.toggleHowler(props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyHowler();
    }
    /**
     * Create howler object with given props
     */

  }, {
    key: 'initHowler',
    value: function initHowler() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      this.destroyHowler();
      if (typeof _howler3.Howl !== 'undefined') {
        // Check if window is available
        this.howler = new _howler3.Howl({
          src: props.src,
          mute: props.mute,
          loop: props.loop,
          onend: props.onEnd,
          onplay: props.onPlay,
          onpause: props.onPause,
          onload: props.onLoad,
          onloaderror: props.onLoadError
        });
      }
    }

    /**
     * Stop, unload and destroy howler object
     */

  }, {
    key: 'destroyHowler',
    value: function destroyHowler() {
      if (this.howler) {
        this.howler.off(); // Remove event listener
        this.howler.stop(); // Stop playback
        this.howler.unload(); // Remove sound from pool
        this.howler = null; // Destroy it
      }
    }
  }, {
    key: 'toggleHowler',
    value: function toggleHowler(props) {
      props.playing ? this.play() : this.pause();
      (0, _utils.runIfSet)(props.mute, this.mute(props.mute));
      (0, _utils.runIfSet)(props.loop, this.loop(props.loop));

      if (props.seek !== this.seek()) {
        this.seek(props.seek);
      }
    }
  }, {
    key: 'play',


    /**
     * Begins playback of a sound when not playing
     */
    value: function play() {
      var playing = this.howler.playing();

      if (!playing) {
        var pos = this.howler.seek();
        this.howler.play();
        if (this.howler.seek() !== pos) {
          this.howler.seek(pos);
        }
      }
    }

    /**
     * Pauses playback of sound or group
     * If no id given, pauses all playback
     * @param {Number} id = undefined [sound of group to pause]
     */

  }, {
    key: 'pause',
    value: function pause() {
      var id = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      if (id) {
        this.howler.pause(id);
      } else {
        this.howler.pause();
      }
    }

    /**
     * Mutes the sound, but doesn't pause the playback.
     * @param {Boolean} [muted] [True to mute and false to unmute]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group are muted]
     */

  }, {
    key: 'mute',
    value: function mute() {
      var _howler;

      (_howler = this.howler).mute.apply(_howler, arguments);
    }

    /**
     * Get/set whether to loop the sound or group. This method can optionally take 0, 1 or 2 arguments.
     * @param {Boolean} [loop] [To loop or not to loop, that is the question]
     * @param {Number} [id] [The sound ID. If none is passed, all sounds in group will have their loop property updated]
     */

  }, {
    key: 'loop',
    value: function loop() {
      var _howler2;

      return (_howler2 = this.howler).loop.apply(_howler2, arguments);
    }

    /**
     * Set/get current position of player
     * @param  {Number} pos [seek player to position]
     * @return {Number}     [return current position]
     */

  }, {
    key: 'seek',
    value: function seek() {
      var pos = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (!this.howler) {
        return 0;
      }

      if (!pos && pos !== 0) {
        return this.howler.seek();
      }

      if (pos || pos === 0) {
        this.howler.seek(pos);
        return pos;
      }
    }

    /**
     * Get the duration of the audio source
     * @return {Number} [Audio length in seconds. Will return 0 until after the load event fires]
     */

  }, {
    key: 'duration',
    value: function duration() {
      return this.howler.duration();
    }

    /**
     * Only render a placeholder
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }, {
    key: 'howler',
    set: function set(howl) {
      if (howl) {
        this._howler = howl;
      }
    },
    get: function get() {
      return this._howler;
    }
  }]);

  return ReactHowler;
}(_react.Component);

ReactHowler.propTypes = {
  src: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]).isRequired,
  playing: _react.PropTypes.bool,
  mute: _react.PropTypes.bool,
  loop: _react.PropTypes.bool,
  onEnd: _react.PropTypes.func,
  onPause: _react.PropTypes.func,
  onPlay: _react.PropTypes.func,
  onLoad: _react.PropTypes.func,
  onLoadError: _react.PropTypes.func
};

ReactHowler.defaultProps = {
  playing: true, // Enable autoplay by default
  mute: false,
  loop: false,
  onEnd: _utils.noop,
  onPause: _utils.noop,
  onPlay: _utils.noop,
  onLoad: _utils.noop,
  onLoadError: _utils.noop
};

exports.default = ReactHowler;
