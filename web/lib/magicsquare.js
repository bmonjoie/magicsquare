if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'magicsquare'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'magicsquare'.");
}
var magicsquare = function (_, Kotlin) {
  'use strict';
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  function Controller() {
    this.score_3uuc7u$_0 = 1;
    this.last_0 = 0;
    this.array_0 = this.array_0;
    this.next_0 = this.next_0;
    this.reset();
  }
  Object.defineProperty(Controller.prototype, 'score', {
    get: function () {
      return this.score_3uuc7u$_0;
    },
    set: function (score) {
      this.score_3uuc7u$_0 = score;
    }
  });
  Controller.prototype.reset = function () {
    this.score = 1;
    this.last_0 = 0;
    this.array_0 = Kotlin.newArray(100, 0);
    this.array_0[0] = this.score;
    this.next_0 = this.getNextForPosition_za3lpa$(this.last_0);
  };
  Controller.prototype.getNextForPosition_za3lpa$ = function (position) {
    var $receiver = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var col = position % 10;
    var row = position / 10 | 0;
    if (row > 2) {
      this.addIfPositionEmpty_0($receiver, position - 30 | 0);
    }
    if (row < 7) {
      this.addIfPositionEmpty_0($receiver, position + 30 | 0);
    }
    if (col > 2) {
      this.addIfPositionEmpty_0($receiver, position - 3 | 0);
    }
    if (col < 7) {
      this.addIfPositionEmpty_0($receiver, position + 3 | 0);
    }
    if (row > 0 && col > 1) {
      this.addIfPositionEmpty_0($receiver, position - 22 | 0);
    }
    if (row < 9 && col < 8) {
      this.addIfPositionEmpty_0($receiver, position + 22 | 0);
    }
    if (col < 8 && row > 0) {
      this.addIfPositionEmpty_0($receiver, position - 18 | 0);
    }
    if (col > 1 && row < 9) {
      this.addIfPositionEmpty_0($receiver, position + 18 | 0);
    }
    return $receiver;
  };
  Controller.prototype.addIfPositionEmpty_0 = function ($receiver, position) {
    if (this.get_isNotSelected_0(this.array_0[position])) {
      $receiver.add_11rb$(position);
    }
  };
  Controller.prototype.isPositionValidAsNext_za3lpa$ = function (position) {
    return this.next_0.contains_11rb$(position);
  };
  Controller.prototype.setAsNext_za3lpa$ = function (position) {
    if (this.isPositionValidAsNext_za3lpa$(position)) {
      this.array_0[position] = (this.score = this.score + 1 | 0, this.score);
      this.last_0 = position;
      this.next_0 = this.getNextForPosition_za3lpa$(this.last_0);
      return true;
    }
     else {
      return false;
    }
  };
  Controller.prototype.isLast_za3lpa$ = function (i) {
    return i === this.last_0;
  };
  Controller.prototype.valueForPosition_za3lpa$ = function (i) {
    return this.array_0[i];
  };
  Controller.prototype.hasNextMove = function () {
    return !this.next_0.isEmpty();
  };
  Controller.prototype.get_isNotSelected_0 = function ($receiver) {
    return $receiver === 0;
  };
  Controller.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Controller',
    interfaces: []
  };
  function MagicSquare() {
    MagicSquare$Companion_getInstance();
    this.logic_0 = new Controller();
    this.elements_0 = document.getElementsByTagName('td');
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8;
    this.restart_0 = Kotlin.isType(tmp$ = document.getElementById('restart'), HTMLInputElement) ? tmp$ : Kotlin.throwCCE();
    this.score_0 = Kotlin.isType(tmp$_0 = document.getElementById('current_score'), HTMLSpanElement) ? tmp$_0 : Kotlin.throwCCE();
    this.best_0 = Kotlin.isType(tmp$_1 = document.getElementById('best_score'), HTMLSpanElement) ? tmp$_1 : Kotlin.throwCCE();
    this.cheatToggle_0 = Kotlin.isType(tmp$_2 = document.getElementById('cheat'), HTMLInputElement) ? tmp$_2 : Kotlin.throwCCE();
    this.cheat_0 = false;
    this.nextCheat_0 = null;
    tmp$_3 = until(0, this.elements_0.length);
    tmp$_4 = tmp$_3.first;
    tmp$_5 = tmp$_3.last;
    tmp$_6 = tmp$_3.step;
    for (var i = tmp$_4; i <= tmp$_5; i += tmp$_6) {
      (tmp$_7 = this.elements_0[i]) != null ? tmp$_7.addEventListener('click', MagicSquare_init$lambda(i, this), true) : null;
      (tmp$_8 = this.elements_0[i]) != null ? tmp$_8.addEventListener('mouseover', MagicSquare_init$lambda_0(i, this), true) : null;
    }
    this.restart_0.addEventListener('click', MagicSquare_init$lambda_1(this), true);
    this.cheatToggle_0.addEventListener('click', MagicSquare_init$lambda_2(this), true);
  }
  MagicSquare.prototype.onElementClicked_0 = function (position) {
    var tmp$, tmp$_0;
    if (this.logic_0.setAsNext_za3lpa$(position)) {
      this.nextCheat_0 = null;
      this.display();
      if (!this.logic_0.hasNextMove()) {
        if (this.logic_0.score === 100) {
          alert('You won !');
        }
        var previousBest = (tmp$_0 = (tmp$ = this.best_0.textContent) != null ? Kotlin.kotlin.text.toDoubleOrNull_pdl1vz$(tmp$) : null) != null ? tmp$_0 : 0.0;
        if (previousBest < this.logic_0.score) {
          this.best_0.textContent = this.logic_0.score.toString();
        }
      }
    }
  };
  MagicSquare.prototype.onElementHover_0 = function (position) {
    if (this.cheat_0) {
      if (this.logic_0.isPositionValidAsNext_za3lpa$(position)) {
        this.nextCheat_0 = this.logic_0.getNextForPosition_za3lpa$(position);
      }
       else {
        this.nextCheat_0 = null;
      }
      this.display();
    }
  };
  MagicSquare.prototype.onRestartClicked_0 = function () {
    this.logic_0.reset();
    this.display();
  };
  MagicSquare.prototype.onCheatToggle_0 = function () {
    this.cheat_0 = this.cheatToggle_0.checked;
    if (!this.cheat_0) {
      this.nextCheat_0 = null;
      this.display();
    }
  };
  function MagicSquare$display$lambda(this$MagicSquare, closure$i) {
    return function ($receiver) {
      var tmp$;
      $receiver.textContent = '';
      removeClass($receiver, [MagicSquare$Companion_getInstance().NEXT]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().CHEAT]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().FILLED]);
      removeClass($receiver, [MagicSquare$Companion_getInstance().LAST]);
      if (this$MagicSquare.logic_0.isPositionValidAsNext_za3lpa$(closure$i)) {
        addClass($receiver, [MagicSquare$Companion_getInstance().NEXT]);
      }
      if ((tmp$ = this$MagicSquare.nextCheat_0) != null) {
        if (tmp$.contains_11rb$(closure$i)) {
          addClass($receiver, [MagicSquare$Companion_getInstance().CHEAT]);
        }
      }
      var position = this$MagicSquare.logic_0.valueForPosition_za3lpa$(closure$i);
      if (position !== 0) {
        $receiver.textContent = position.toString();
        addClass($receiver, [MagicSquare$Companion_getInstance().FILLED]);
        if (this$MagicSquare.logic_0.isLast_za3lpa$(closure$i)) {
          addClass($receiver, [MagicSquare$Companion_getInstance().LAST]);
        }
      }
    };
  }
  MagicSquare.prototype.display = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.score_0.textContent = this.logic_0.score.toString();
    tmp$ = until(0, this.elements_0.length);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2) {
      MagicSquare$display$lambda(this, i)(Kotlin.isType(tmp$_3 = this.elements_0[i], HTMLTableCellElement) ? tmp$_3 : Kotlin.throwCCE());
    }
  };
  function MagicSquare$Companion() {
    MagicSquare$Companion_instance = this;
    this.LAST = 'last';
    this.FILLED = 'filled';
    this.NEXT = 'next';
    this.CHEAT = 'cheat';
  }
  MagicSquare$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var MagicSquare$Companion_instance = null;
  function MagicSquare$Companion_getInstance() {
    if (MagicSquare$Companion_instance === null) {
      new MagicSquare$Companion();
    }
    return MagicSquare$Companion_instance;
  }
  function MagicSquare_init$lambda(closure$i, this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onElementClicked_0(closure$i);
    };
  }
  function MagicSquare_init$lambda_0(closure$i, this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onElementHover_0(closure$i);
    };
  }
  function MagicSquare_init$lambda_1(this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onRestartClicked_0();
    };
  }
  function MagicSquare_init$lambda_2(this$MagicSquare) {
    return function (it) {
      this$MagicSquare.onCheatToggle_0();
    };
  }
  MagicSquare.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'MagicSquare',
    interfaces: []
  };
  function main(args) {
    (new MagicSquare()).display();
  }
  var package$be = _.be || (_.be = {});
  var package$xzan = package$be.xzan || (package$be.xzan = {});
  var package$magicsquare = package$xzan.magicsquare || (package$xzan.magicsquare = {});
  package$magicsquare.Controller = Controller;
  Object.defineProperty(MagicSquare, 'Companion', {
    get: MagicSquare$Companion_getInstance
  });
  package$magicsquare.MagicSquare = MagicSquare;
  package$magicsquare.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('magicsquare', _);
  return _;
}(typeof magicsquare === 'undefined' ? {} : magicsquare, kotlin);
