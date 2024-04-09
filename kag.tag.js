tyrano.plugin.kag.tag.scene_part_number = {
      pm: {
         text: ""
      },
      start: function (t) {
         TYRANO.kag.stat.f.scene_part_number = t.text, TYRANO.kag.ftag.nextOrder()
      }
   }, tyrano.plugin.kag.tag.reset_savetitle = {
      start: function (t) {
         TYRANO.kag.stat.f.scene_part_number = "", TYRANO.kag.ftag.nextOrder()
      }
   },
   function (t) {
      for (var a, g = 0; g < t.length; g++) a = t[g], tyrano.plugin.kag.ftag.master_tag[a] = object(tyrano.plugin.kag.tag[a]), tyrano.plugin.kag.ftag.master_tag[a].kag = TYRANO.kag
   }(["scene_part_number", "reset_scene_part_number"]), TYRANO.kag.ftag.master_tag.clearstack.start = function (t) {
      if ("" == t.stack)
         for (var a in this.kag.stat.stack) this.kag.stat.stack[a] = [];
      else this.kag.stat.stack[t.stack] = [];
      this.kag.ftag.nextOrder()
   };