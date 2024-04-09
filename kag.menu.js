tyrano.plugin.kag.menu.doSave = function (num, cb) {
   var array_save = this.getSaveData(),
      data = {},
      that = this;
   if (null == this.snap) this.snapSave(this.kag.stat.current_save_str, (function () {
      (data = that.snap).save_date = $.getNowDate() + "　" + $.getNowTime();
      data.scene_part_number = that.kag.stat.f.scene_part_number;
      data.slot_new = num;
	  data.date_text = '[FH]';
	  data.game_time_text = '[Tiempo de juego]';
	  data.game_time = '00h 00m'
      array_save.data[num] = data;
	  for (var i = 0; i < 20; i++) {
          if (array_save.data[i] && typeof array_save.data[i].slot_new !== 'undefined') {
			  array_save.data[i].slot_new = num;
          }
      }
      $.setStorage(that.kag.config.projectID + "_tyrano_data", array_save, that.kag.config.configSave);
      "function" == typeof cb && cb(data)
   }));
   else {
      (data = that.snap).save_date = $.getNowDate() + "　" + $.getNowTime();
      data.scene_part_number = that.kag.stat.f.scene_part_number;
      data.slot_new = num;
	  data.date_text = '[FH]';
	  data.game_time_text = '[Tiempo de juego]';
	  data.game_time = '00h 00m'
      array_save.data[num] = data;
	  for (var i = 0; i < 20; i++) {
        if (array_save.data[i] && typeof array_save.data[i].slot_new !== 'undefined') {
			array_save.data[i].slot_new = num;
        }
      }
      $.setStorage(that.kag.config.projectID + "_tyrano_data", array_save, that.kag.config.configSave);
      "function" == typeof cb && cb(data)
   }
};

tyrano.plugin.kag.menu.displaySave = function (cb) {
   var that = this;
   this.kag.stat.is_skip = !1;
   for (var array = that.getSaveData().data, i = (that.kag.layer.getMenuLayer(), 0); i < array.length; i++) array[i].num = i;
   this.kag.html("save", {
      array_save: array,
      novel: $.novel
   }, (function (html_str) {
      var j_save = $(html_str);
      j_save.find(".save_list").css("font-family", that.kag.config.userFace);
      j_save.find(".save_display_area").each((function () {
         $(this).click((function (e) {
			$(".save_list_item_new").remove();
            var num = $(this).attr("data-num");
            that.snap = null;
            that.doSave(num, (function (save_data) {
               var j_slot = layer_menu.find("[data-num='" + num + "']");
               if ("" != save_data.img_data)
                  if (j_slot.find(".save_list_item_thumb").find("img").get(0)) j_slot.find(".save_list_item_thumb").find("img").attr("src", save_data.img_data);
                  else {
                     j_slot.find(".save_list_item_thumb").css("background-image", "");
                     j_slot.find(".save_list_item_thumb").append("<img>");
                     j_slot.find(".save_list_item_thumb").find("img").attr("src", save_data.img_data)
                  } j_slot.find(".save_list_item_date").html(save_data.save_date);
               j_slot.find(".save_list_item_text").html(save_data.title);
               j_slot.find(".save_list_item_scene_part_number").html(save_data.scene_part_number);
			   j_slot.find(".save_list_item_date_text").html('[FH]');
			   j_slot.find(".save_list_item_game_time_text").html('[Tiempo de juego]');
			   j_slot.find(".save_list_item_game_time").html('00h 00m');
			   j_slot.find(".save_list_item_num_left[data-num='" + num + "']").attr('data-status', 'active');
			   j_slot.find(".save_list_item_num_left[data-num='" + num + "']").attr('src', 'tyrano/images/system/slot_number/active/'+num+'.png');
			   j_slot.find(".columna.new_slot[data-num='" + num + "']").html('<img class="save_list_item_new scaling-animation" data-num=' + num + ' src="tyrano/images/system/icon_new.png">');
               "function" == typeof cb && cb()
            }))
         }))
      }));
      j_save.find(".button_smart").hide();
      if ("pc" != $.userenv()) {
         j_save.find(".button_smart").show();
         j_save.find(".button_arrow_up").click((function () {
            var pos = j_save.find(".area_save_list").scrollTop() - 160;
            layer_menu.find(".area_save_list").animate({
               scrollTop: pos
            }, {
               queue: !1
            })
         }));
         j_save.find(".button_arrow_down").click((function () {
            var pos = j_save.find(".area_save_list").scrollTop() + 160;
            j_save.find(".area_save_list").animate({
               scrollTop: pos
            }, {
               queue: !1
            })
         }))
      }
      var layer_menu = that.kag.layer.getMenuLayer();
      that.setMenu(j_save, cb)
   }))
};