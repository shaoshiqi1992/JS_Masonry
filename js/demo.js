$(function(){
    //Call the function
    $('#brand-masonry').masonry();
});
(function ($) {
    $.fn.masonry = function(options) {
        var df = {
            item: '.item',
            margin: 15,
            //fill the blank in the bottom or not
            addfooter: false
        };
        options = $.extend(df, options);
        return this.each(function() {
            var $box = $(this), pos = [],
                _box_width = $box.width(),
                $items = $box.find(options.item),
                _owidth = $items.eq(0).outerWidth() + options.margin,
                _oheight = $items.eq(0).outerHeight() + options.margin,
            //decide how many items in one row.
                _num = Math.floor(_box_width/_owidth);
            //decide every element's position on the 1st row
            (function() {
                var i = 0;
                for (; i < _num; i++) {
                    pos.push([i*_owidth,0]);
                }
            })();

            $items.each(function() {
                var _this = $(this),
                    _temp = 0,
                    //the height of every div
                    _height = _this.outerHeight() + options.margin;
                //Add mouseover animation for the items
                _this.hover(function() {
                    _this.addClass('hover');
                },function() {
                    _this.removeClass('hover');
                });

                for (var j = 0; j < _num; j++) {
                    if(pos[j][1] < pos[_temp][1]){
                        //find smallest top in every row
                        _temp = j;
                    }
                }
                //set left and top
                this.style.cssText = 'left:'+pos[_temp][0]+'px; top:'+pos[_temp][1]+'px;';
                //refresh top
                pos[_temp][1] = pos[_temp][1] + _height;
            });

            // offer the biggest top to the outside div
            (function() {
                var i = 0, tops = [];
                for (; i < _num; i++) {
                    tops.push(pos[i][1]);
                }
                tops.sort(function(a,b) {
                    return a-b;
                });
                $box.height(tops[_num-1]);
                //if fill the outside div or not
                if(options.addfooter){
                    addfooter(tops[_num-1]);
                }
            })();
            //fill the div
            function addfooter(max) {
                var addfooter = document.createElement('div');
                addfooter.className = 'item additem';
                
                for (var i = 0; i < _num; i++) {
                    if(max != pos[i][1]){
                        var clone = addfooter.cloneNode(),
                            _height = max - pos[i][1] - options.margin;
                        clone.style.cssText = 'left:'+pos[i][0]+'px; top:'+pos[i][1]+'px; height:'+_height+'px;';
                        $box[0].appendChild(clone);
                    }
                }
            }
        });
    }
})(jQuery);