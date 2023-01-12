$(document).ready(function () {
  //FORMS
  function forms() {
    //SELECT
    if ($("select").length > 0) {
      function selectscrolloptions() {
        var scs = 100;
        var mss = 50;
        if (isMobile.any()) {
          scs = 10;
          mss = 1;
        }
        var opt = {
          cursorcolor: "#9B4E7C",
          cursorwidth: "12px",
          background: "",
          autohidemode: false,
          bouncescroll: false,
          cursorborderradius: "10px",
          scrollspeed: scs,
          mousescrollstep: mss,
          directionlockdeadzone: 0,
          cursorborder: "0px solid #fff",
        };
        return opt;
      }

      function select() {
        $.each($("select"), function (index, val) {
          var ind = index;
          $(this).hide();
          if ($(this).parent(".select-block").length == 0) {
            $(this).wrap(
              "<div class='select-block " +
                $(this).attr("class") +
                "-select-block'></div>"
            );
          } else {
            $(this).parent(".select-block").find(".select").remove();
          }
          let cl = "";
          var milti = "";
          var check = "";
          var sblock = $(this).parent(".select-block");
          var soptions =
            "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
          if ($(this).attr("multiple") == "multiple") {
            milti = "multiple";
            check = "check";
          }
          $.each($(this).find("option"), function (index, val) {
            if ($(this).attr("class") != "" && $(this).attr("class") != null) {
              let cl = $(this).attr("class");
            }
            if ($(this).attr("value") != "") {
              if (
                $(this).attr("data-icon") != "" &&
                $(this).attr("data-icon") != null
              ) {
                soptions =
                  soptions +
                  "<div data-value='" +
                  $(this).attr("value") +
                  "' class='select-options__value_" +
                  ind +
                  " select-options__value value_" +
                  $(this).val() +
                  " " +
                  cl +
                  " " +
                  check +
                  "'><div><img src=" +
                  $(this).attr("data-icon") +
                  ' alt=""></div><div>' +
                  $(this).html() +
                  "</div></div>";
              } else {
                soptions =
                  soptions +
                  "<div data-value='" +
                  $(this).attr("value") +
                  "' class='select-options__value_" +
                  ind +
                  " select-options__value value_" +
                  $(this).val() +
                  " " +
                  cl +
                  " " +
                  check +
                  "'>" +
                  $(this).html() +
                  "</div>";
              }
            } else if ($(this).parent().attr("data-label") == "on") {
              if (sblock.find(".select__label").length == 0) {
                sblock.prepend(
                  '<div class="select__label">' + $(this).html() + "</div>"
                );
              }
            }
          });
          soptions = soptions + "</div></div></div>";
          if ($(this).attr("data-type") == "search") {
            sblock.append(
              "<div data-type='search' class='select_" +
                ind +
                " select" +
                " " +
                $(this).attr("class") +
                "__select " +
                milti +
                "'>" +
                "<div class='select-title'>" +
                "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
                "<input data-value='" +
                $(this).find('option[selected="selected"]').html() +
                "' class='select-title__value value_" +
                $(this).find('option[selected="selected"]').val() +
                "' />" +
                "</div>" +
                soptions +
                "</div>"
            );
            $(".select_" + ind)
              .find("input.select-title__value")
              .jcOnPageFilter({
                parentSectionClass: "select-options_" + ind,
                parentLookupClass: "select-options__value_" + ind,
                childBlockClass: "select-options__value_" + ind,
              });
          } else if ($(this).attr("data-icon") == "true") {
            sblock.append(
              "<div class='select_" +
                ind +
                " select" +
                " " +
                $(this).attr("class") +
                "__select icon " +
                milti +
                "'>" +
                "<div class='select-title'>" +
                "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
                "<div class='select-title__value value_" +
                $(this).find('option[selected="selected"]').val() +
                "'><div><img src=" +
                $(this).find('option[selected="selected"]').attr("data-icon") +
                ' alt=""></div><div>' +
                $(this).find('option[selected="selected"]').html() +
                "</div></div>" +
                "</div>" +
                soptions +
                "</div>"
            );
          } else {
            sblock.append(
              "<div class='select_" +
                ind +
                " select" +
                " " +
                $(this).attr("class") +
                "__select " +
                milti +
                "'>" +
                "<div class='select-title'>" +
                "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
                "<div class='select-title__value value_" +
                $(this).find('option[selected="selected"]').val() +
                "'>" +
                $(this).find('option[selected="selected"]').html() +
                "</div>" +
                "</div>" +
                soptions +
                "</div>"
            );
          }
          if ($(this).find('option[selected="selected"]').val() != "") {
            sblock.find(".select").addClass("focus");
          }

          if (sblock.find(".select-options__value").length == 1) {
            sblock.find(".select").addClass("one");
          }

          if ($(this).attr("data-req") == "on") {
            $(this).addClass("req");
          }
          $(".select_" + ind + " .select-options-scroll").niceScroll(
            ".select-options-list",
            selectscrolloptions()
          );
        });
      }
      select();
    }
  }
  forms();

  $("body").on("click", ".tab__navitem", function (event) {
    var eq = $(this).index();
    if ($(this).hasClass("parent")) {
      var eq = $(this).parent().index();
    }
    if (!$(this).hasClass("active")) {
      $(this).closest(".tabs").find(".tab__navitem").removeClass("active");
      $(this).addClass("active");
      $(this)
        .closest(".tabs")
        .find(".tab__item")
        .removeClass("active")
        .eq(eq)
        .addClass("active");
      if ($(this).closest(".tabs").find(".slick-slider").length > 0) {
        $(this).closest(".tabs").find(".slick-slider").slick("setPosition");
      }
    }
  });

  $("body").on("click", ".spoller", function (event) {
    if (!$(this).hasClass("active")) {
      $(this).find(".spoller__icon-cross").addClass("active");
    } else {
      $(this).find(".spoller__icon-cross").removeClass("active");
    }
  });

  $.each($(".spoller.active"), function (index, val) {
    $(this).next().show();
  });
  $("body").on("click", ".spoller", function (event) {
    if ($(this).hasClass("mob") && !isMobile.any()) {
      return false;
    }
    if ($(this).hasClass("closeall") && !$(this).hasClass("active")) {
      $.each(
        $(this).closest(".spollers").find(".spoller"),
        function (index, val) {
          $(this).removeClass("active");
          $(this).next().slideUp(300);
        }
      );
    }
    $(this)
      .toggleClass("active")
      .next()
      .slideToggle(300, function (index, val) {
        if ($(this).parent().find(".slick-slider").length > 0) {
          $(this).parent().find(".slick-slider").slick("setPosition");
        }
      });
  });
});
