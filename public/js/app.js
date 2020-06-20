$(function () {
            
    // click back top
    var back_top = {
        "btn_scroll": ".action__site .backTop--action",
    }

    // declare notification register
    var notification_modal_register = {
        modal      : ".quick__register",
        btn_open   : ".quickg__outside[data-action='open']",
        btn_close  : ".quickg__outside[data-action='close']",
        icon       : "span.icon.fa",
        icon_open  : "fa-caret-left",
        icon_close : "fa-caret-right",
        allow      : true,
        auto_open  : false
    }

    // declart notification discount
    var notification_modal_discount = {
        modal      : ".config__top-banner",
        btn_close  : ".icon__close-banner",
        content    : "#wp__section-option-bar",
        allow      : true,
        auto_open  : true
    }


    // time discount total page 
    var time_discount = {
        h        : 1,
        m        : 0,
        s        : 5,
        timeout  : null,
        append_h : ".count__time .number[data-time='hour']",
        append_m : ".count__time .number[data-time='minute']",
        append_s : ".count__time .number[data-time='seconds']",
    }

    // time flash sale
    var time_flash_sale = {
        h        : 0,
        m        : 0,
        s        : 12,
        timeout  : null,
        append_h : ".deadline__item.deadline--hour .hour__item span",
        append_m : ".deadline__item.deadline--minute .minute__item span",
        append_s : ".deadline__item.deadline--seconds .seconds__item span",
    }

    // tải thêm dữ liệu sản phẩm
    var load_data_product = {
        btn_load       : ".btn__see-more",
        show_btn       : true,
        show_data      : false,
        data_load      : ".section__content",
        num_page_hide  : 2,
        timing         : 1000,
        data_hide      : {
            list_data_hide : new Array(12,13),
        },
        data_last_curr : 11,

    }


    init();
    scroll_header();
    load_data_more();
    // initialization function  
    function init() {
        loading('#wrapper', 2000);
        show_hide_btn_scroll();
        handling_action_modal_register();
        handling_action_modal_discount();
    }

    // click vào nút lên top ( back top )
    $(back_top.btn_scroll).click(() => {
        scroll_top();
    });

    // effect load page
    function loading(id_name, timing) {
        load_animation_banner();
        // load function animation
        // ----------------------
        let html_loading = "<div class='mark-loading'></div>\
                            <div class='loading'><div class='loader'>Loading...</div></div>";
        $(id_name).prepend(html_loading);
        $('.loading').fadeIn(300);
        setTimeout(() => {
            $('.loading').fadeOut(300);
            $('.mark-loading').fadeOut(300);
            action_notification_modal_discount();
            $("body,html").animate({
                scrollTop: 0,
            }, 1000);
        }, timing);
        setTimeout(() => {
            $('.loading').remove();
            $('.mark-loading').remove();
            // call function 
            notification_discout();
            action_notification_modal_register();
            countdown_time(time_discount,time_discount.h,time_discount.m,time_discount.s);
            call_wow_animation();
            // countdown_time(time_flash_sale,time_flash_sale.h,time_flash_sale.m,time_flash_sale.s);
        }, timing + 300);
    }

    // infomation notification discount for customer
    function notification_discout() {
        let notifi_value = {
            notifi_item: ".notifi-discount",
            notifi_curr: ".notifi-discount.active",
            timing_change: 3000,
            timing_open: 500,
            timing_close: 2000,
            effect: false,
        }
        let index_notifi_curr = $(notifi_value.notifi_curr).index();
        let index_last_notifi = $(notifi_value.notifi_item + ":last-child").index();
        show_notifi(notifi_value.notifi_item,notifi_value.effect,index_notifi_curr,index_last_notifi,notifi_value.timing_change,notifi_value.timing_open,notifi_value.timing_close);
    }

    // hàm để load dữ liệu của thanh thông báo trên đầu header
    function notification_modal_discout() {
        let notifi_value = {
            notifi_item : ".notification__banner-item",
            notifi_curr : ".notification__banner-item.active",
            timing_change: 2000,
            timing_open: 600,
            timing_close: 600,
            effect: false,
        }
        let index_notifi_curr = $(notifi_value.notifi_curr).index();
        let index_last_notifi = $(notifi_value.notifi_item + ":last-child").index();
        show_notifi(notifi_value.notifi_item,notifi_value.effect,index_notifi_curr,index_last_notifi,notifi_value.timing_change,notifi_value.timing_open,notifi_value.timing_close);
    }

    // Hàm show những thông báo giảm giá khuyển mãi
    function show_notifi(notifi_item,effect,index_notifi_curr,index_last_notifi,timing_change,timing_open,timing_close) {
        setInterval(() => {
            if (effect == true) {
                $(notifi_item).fadeOut(timing_open);
                setTimeout( () => {
                    $(notifi_item).removeClass('active');
                },2000);
            } else {
                $(notifi_item).removeClass('active');
            }
            index_notifi_curr++;
            if (index_notifi_curr > index_last_notifi) {
                index_notifi_curr = 0;
            }
            if (effect == true) {
                $(notifi_item).eq(index_notifi_curr).fadeIn(timing_close);
                setTimeout( () => {
                    $(notifi_item).removeClass('active');
                },2000);
            } else {
                $(notifi_item).eq(index_notifi_curr).addClass('active');
            }
        }, timing_change); 
    }

    // Hàm xử lí ẩn hiện nút scoll lên top
    function show_hide_btn_scroll() {
        $(window).scroll(() => {
            if ($(window).scrollTop() > 200) {
                $('.action__site').fadeIn(300);
            } else {
                $('.action__site').fadeOut(300);
            }
        });
    }

    // scroll top 
    function scroll_top() {
        $('html,body').animate({
            scrollTop: 0
        }, 1500);
    }
    // function handling action modal register ( click open or click close register)
    function handling_action_modal_register() {
        // click open modal register
        $(notification_modal_register.modal).delegate(notification_modal_register.btn_open, 'click', () => {
            notification_modal_register.auto_open = true;
            action_notification_modal_register();
        });

        // click close modal register
        $(notification_modal_register.modal).delegate(notification_modal_register.btn_close, 'click', () => {
            notification_modal_register.auto_open = false;
            action_notification_modal_register();
        });
    }
    // function open modal register
    function action_notification_modal_register() {
        if (notification_modal_register.allow == true && notification_modal_register.auto_open == true) {
            $(notification_modal_register.modal).addClass('open');
            $(notification_modal_register.btn_open).attr('data-action', 'close');
            $(notification_modal_register.icon).removeClass(notification_modal_register.icon_open);
            $(notification_modal_register.icon).addClass(notification_modal_register.icon_close);
        } else {
            $(notification_modal_register.modal).removeClass('open');
            $(notification_modal_register.btn_close).attr('data-action', 'open');
            $(notification_modal_register.icon).removeClass(notification_modal_register.icon_close);
            $(notification_modal_register.icon).addClass(notification_modal_register.icon_open);
        }
    }

    // function handling action modal banner discount ( click open or click close banner discount)
    function handling_action_modal_discount() {
        $(notification_modal_discount.modal).delegate(notification_modal_discount.btn_close,'click', () => {
            notification_modal_discount.allow = false;
            action_notification_modal_discount();
        });
    }

    // Hàm này sẽ có nhiệm vụ lấy yêu cầu của người dùng là có hiện cái thay thông báo trên đầu header hay không
    function action_notification_modal_discount() {
        if (notification_modal_discount.allow == true && notification_modal_discount.auto_open == true) {
            $(notification_modal_discount.modal).stop().slideDown();
            $(notification_modal_discount.content).addClass('active');
            $("#wp__content").addClass('active');
            notification_modal_discout();
        } else {
            $(notification_modal_discount.modal).stop().slideUp();
            $(notification_modal_discount.content).removeClass('active');
            $("#wp__content").removeClass('active');
        }
    }

    // dữ liệu của header    
    var scroll_header = {
        scroll_top_curr : 0,
        scroll_top_old  : 0,
        header_scroll   : "#header"
    }

    // hàm xử lí scoll menu header 
    function scroll_header() {
        var s;
        $(window).scroll(() => {
            s = $(window).scrollTop();
            scroll_header.scroll_top_curr = s;
            if ( scroll_header.scroll_top_curr > scroll_header.scroll_top_old ) {
                // console.log('scroll xuống');
                scroll_header.scroll_top_old = scroll_header.scroll_top_curr;
                // console.log(scroll_header.scroll_top_curr);
                if (scroll_header.scroll_top_curr > 200) {
                    $(scroll_header.header_scroll).css({
                        "transform" : "translateY(-100%)",
                        "transition" : "all .5s"
                    });
                }
                    
            } else {
                // console.log('scroll lên');
                scroll_header.scroll_top_old = scroll_header.scroll_top_curr;
                $(scroll_header.header_scroll).css({
                    "transform" : "translateY(0)",
                    "transition" : "all .4s"
                });
            }
        });
    }

    // Đếm ngược thời gian
    function countdown_time(time_of,h,m,s) {
        
        if ( s === -1 ) {
            m -= 1;
            s = 59;
        }
        if ( m === -1 ) {
            h -= 1;
            m  = 59;
        }
        if ( h === -1 ) {
            // stop_clock();
            return false;
        }

        var num_time_arr = Array(1,2,3,4,5,6,7,8,9);

        if ( h == 0 ) {
            h = '00';
        }
        if ( m == 0 ) {
            m = '00';
        }
        if ( s == 0 ) {
            s = '00';
        }

        $(time_of.append_h).text(h);
        $(time_of.append_m).text(m);
        $(time_of.append_s).text(s);

        time_of.timeout = setTimeout( () => {
            s --;
            countdown_time(time_of,h,m,s);
        },1000 );
    }


    
    // Hàm để load thêm những sản phẩm chưa được hiện;
    function load_data_more() {
        if (load_data_product.show_data == false && load_data_product.show_btn == true ) {
            var btn_html = load_btn_load_data();
            var data_id;
            for ( var i = 0 ; i < load_data_product.data_hide.list_data_hide.length ; i++ ) {
                data_id = load_data_product.data_hide.list_data_hide[i];
                $(load_data_product.data_load+".content--"+(data_id)+"").hide();
                $(load_data_product.data_load+".content--"+(data_id)+"").find('.outfi__style-item').hide();
            }
            // console.log(load_btn_load_data());
            i--;
            let id_append = load_data_product.data_hide.list_data_hide[i] - load_data_product.num_page_hide;
            $(load_data_product.data_load+".content--"+(id_append)+"").after(load_btn_load_data());
            $(load_data_product.btn_load).css({
                "color"            : "#fff",
                "background-color" : "rgb(247, 182, 182)",
                "border-radius"    : "6px",
                "margin-bottom"    : "10px",
                "width"            : "120px",
                "height"           : "32px",
                "text-align"       : "center"
            });
            click_show_data();
        } else {
            $(load_data_product.btn_load).remove();
        }
    }

    // Hàm này được gọi khi click vào nút để load thêm sản phẩm
    function click_show_data() {
        $('body').delegate(load_data_product.btn_load,'click',function () {
            $(this).empty();
            $(this).append("<div class='loader'>Loading...</div>");
            setTimeout(function () {
                var data_id;
                for ( var i = 0 ; i < load_data_product.data_hide.list_data_hide.length ; i++ ) {
                    data_id = load_data_product.data_hide.list_data_hide[i];
                    $(load_data_product.data_load+".content--"+(data_id)+"").fadeIn();
                    $(load_data_product.data_load+".content--"+(data_id)+"").find('.outfi__style-item').slideDown();
                    var place_append = $(load_data_product.data_load+".content--"+(data_id)+"").find('.outfi__style-item');
                    TweenMax.staggerFrom(place_append,1,{top:100,opacity:0},0.3);
                }
            },load_data_product.timing);
            setTimeout(function () {
                load_data_product.show_btn = false;
                load_data_more();
            },load_data_product.timing + 50);
            event.preventDefault();
        });
    }

    // load data more
    function load_btn_load_data() {
        var btn_html = " <div class='d-flex justify-content-center align-items-center see--more'>\
                            <a href='' class='btn__see-more'><span style='width: 100%;'>Xem thêm</span><span class='loading'></span></a>\
                         </div>";
        return btn_html;
    }

    // load animation khi mà web loading xong
    function load_animation_banner() {
        $('.section__content.content--1').find('.content--left').addClass('animation');
        $('.section__content.content--1').find('.content--right').addClass('animation');
    }
    function load_animation_highlight() {
        $('.section__content.content--2').addClass('animation');
        $('.section__content.content--3').addClass('animation');
    }

    // lấy ra offset của thằng đg được shop giới thiệu
    function highlight_offset() {
        var offset = $('.section__content.content--2').offset().top;
        return offset;
    }

    // Gọi link wow animation
    function call_wow_animation() {
        new WOW().init();
    }

    // modal show detail products
    var modal_show_detail_img = {
        wrapper_modal  : "#modal__detail--product",
        modal_content  : ".modal__content",
        btn_close      : ".modal__close",
        btn_show_modal : "[data-target='#modal__detail--product']",
        main_avatar    : ".main__avatar"
    }
    
    function close_modal(timing) {  
        $(modal_show_detail_img.wrapper_modal).fadeOut(timing);
        $(modal_show_detail_img.modal_content).removeClass('show');
    }

    function open_modal(timing) {
        $(modal_show_detail_img.wrapper_modal).fadeIn(timing);
        $(modal_show_detail_img.modal_content).addClass('show');
    }

    // action open
    $(modal_show_detail_img.btn_show_modal).click(function () {
        let src_img = $(this).find('img').attr('src');
        $(modal_show_detail_img.wrapper_modal).find(modal_show_detail_img.main_avatar).find('img').attr('src',src_img);
        open_modal(800);
        event.preventDefault();
    });
    // action close
    $(modal_show_detail_img.wrapper_modal).on('click',modal_show_detail_img.btn_close,function () {
        close_modal(400);
    });

});