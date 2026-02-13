<?php
if (isset($_COOKIE["tipo_sesion"])) {
    if ($_COOKIE["tipo_sesion"] != "1") {
        echo '<meta http-equiv="refresh" content="0;url=logout.php">';
        die();
    }

}
;

if (isset($_COOKIE["sesion"])  && isset($_COOKIE["verificaSesion"])) {
  if ($_COOKIE["sesion"] != "activa" || $_COOKIE["verificaSesion"] != "activa") {
    echo '<meta http-equiv="refresh" content="0;url=login.php">';
    die();
  }
}else {
  echo '<meta http-equiv="refresh" content="0;url=login.php">';
  die();
}

?>
<link href="assets/libs/chartist/dist/chartist.min.css" rel="stylesheet">
<link href="assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css" rel="stylesheet">
<!-- <link href="dist/css/style.css" rel="stylesheet"> -->
<link href="./assets//newDesign/css/custom.css" rel="stylesheet">
<link href="dist/css/pages/data-table.css" rel="stylesheet">
<link href="dist/css/pages/dashboard1.css" rel="stylesheet">

<!-- CSS -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
<!-- Default theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
<!-- Semantic UI theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css" />
<!-- Bootstrap theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css" />
<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.2.0/css/all.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
    integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link href="dist/css/pages/data-table.css" rel="stylesheet">

<style media="screen">
    .loader-container {
        position: absolute;
        width: 100vh;
        height: 100vh;
        top: 25vh;
        left: 25vh;
        z-index: 99;
        text-align: center;
        border: 1px solid black;
    }

    .loader-container .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border: solid 10px transparent;
        border-top-color: red;
        border-left-color: red;
        border-radius: 50%;
        animation: loader 1.2s linear infinite;
    }

    .loader-container .loader2 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        height: 70%;
        border: solid 10px transparent;
        border-top-color: red;
        border-left-color: red;
        border-radius: 50%;
        animation: loader2 1.2s linear infinite;
    }

    @keyframes loader {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    @keyframes loader2 {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
            transform: translate(-50%, -50%) rotate(-360deg);
        }
    }


    .AgregarBtnBlue {
        background-image: linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%);
        border-radius: .5rem;
        box-sizing: border-box;
        color: #FFFFFF;
        display: flex;
        font-size: 16px;
        justify-content: center;
        padding: 1rem 1.75rem;
        text-decoration: none;
        width: 100%;
        border: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .AgregarBtnBlue:hover {
        background-image: linear-gradient(-180deg, #1D95C9 0%, #17759C 100%);
    }

    @media (min-width: 768px) {
        .AgregarBtnBlue {
            padding: 1rem 2rem;
        }
    }

    .checkBoxMorado {
        position: relative;
    }

    .checkBoxMorado>svg {
        position: absolute;
        top: -130%;
        left: -170%;
        width: 110px;
        pointer-events: none;
    }

    .checkBoxMorado * {
        box-sizing: border-box;
    }

    .checkBoxMorado input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        margin: 0;
    }

    .checkBoxMorado input[type="checkbox"]:focus {
        outline: 0;
    }

    .checkBoxMorado .cbx {
        width: 24px;
        height: 24px;
        top: calc(50vh - 12px);
        left: calc(50vw - 12px);
    }

    .checkBoxMorado .cbx input {
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        border: 2px solid #bfbfc0;
        border-radius: 50%;
    }

    .checkBoxMorado .cbx label {
        width: 24px;
        height: 24px;
        background: none;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-filter: url("#goo-12");
        filter: url("#goo-12");
        transform: trasnlate3d(0, 0, 0);
        pointer-events: none;
    }

    .checkBoxMorado .cbx svg {
        position: absolute;
        top: 5px;
        left: 4px;
        z-index: 1;
        pointer-events: none;
    }

    .checkBoxMorado .cbx svg path {
        stroke: #fff;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 19;
        stroke-dashoffset: 19;
        transition: stroke-dashoffset 0.3s ease;
        transition-delay: 0.2s;
    }

    .checkBoxMorado .cbx input:checked+label {
        animation: splash-12 0.6s ease forwards;
    }

    .checkBoxMorado .cbx input:checked+label+svg path {
        stroke-dashoffset: 0;
    }

    @-moz-keyframes splash-12 {
        40% {
            background: #866efb;
            box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
        }

        100% {
            background: #866efb;
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @-webkit-keyframes splash-12 {
        40% {
            background: #866efb;
            box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
        }

        100% {
            background: #866efb;
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @-o-keyframes splash-12 {
        40% {
            background: #866efb;
            box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
        }

        100% {
            background: #866efb;
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }

    @keyframes splash-12 {
        40% {
            background: #866efb;
            box-shadow: 0 -18px 0 -8px #866efb, 16px -8px 0 -8px #866efb, 16px 8px 0 -8px #866efb, 0 18px 0 -8px #866efb, -16px 8px 0 -8px #866efb, -16px -8px 0 -8px #866efb;
        }

        100% {
            background: #866efb;
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
        }
    }


    /* CSS */
    .button-1 {
        background-color: #EA4C89;
        border-radius: 8px;
        border-style: none;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        height: 40px;
        line-height: 20px;
        list-style: none;
        margin: 0;
        outline: none;
        padding: 10px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: color 100ms;
        vertical-align: baseline;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .button-1:hover,
    .button-1:focus {
        background-color: #F082AC;
    }




    .btnAceptarVerde {
        background-color: #117864;
        border-radius: 8px;
        border-style: none;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        height: 40px;
        line-height: 20px;
        list-style: none;
        margin: 0;
        outline: none;
        padding: 10px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: color 100ms;
        vertical-align: baseline;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .btnAceptarVerde:hover,
    .btnAceptarVerde:focus {
        background-color: #1ABC9C;
    }


    .btnEliminar1 {
      align-items: center;
      background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
      border: 0;
      border-radius: 10px;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-family: "Codec cold",sans-serif;
      font-size: 16px;
      font-weight: 700;
      height: 54px;
      justify-content: center;
      letter-spacing: .4px;
      line-height: 1;
      max-width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 3px;
      text-decoration: none;
      text-transform: uppercase;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    .btnEliminar1:active {
      outline: 0;
    }

    .btnEliminar1:hover {
      outline: 0;
    }

    .btnEliminar1 span {
      transition: all 200ms;
    }

    .btnEliminar1:hover span {
      transform: scale(.9);
      opacity: .75;
    }

    @media screen and (max-width: 991px) {
      .btnEliminar1 {
        font-size: 15px;
        height: 50px;
      }

      .btnEliminar1 span {
        line-height: 50px;
      }
    }

.btnUpdate1{
  background: linear-gradient(to bottom right, #EF4765, #FF9A5A);
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.btnUpdate1:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btnUpdate1:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btnUpdate2{
  background: linear-gradient(to bottom right, #DE0000, #EB6363);
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.btnUpdate2:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btnUpdate2:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(239, 71, 101, 0.5);
}

.btnUpdate3{
  background: linear-gradient(to bottom right, #E86D00, #F5BB88 );
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.btnUpdate3:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 10, 0.5), .125rem .125rem 1rem rgba(239, 71, 10, 0.5);
}

.btnUpdate3:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(208, 167, 0, 0.5), .125rem .125rem 1rem rgba(208, 167, 0, 0.5);
}

.btnUpdate4{
  background: linear-gradient(to bottom right, #00B935 , #8CE9A7 );
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.btnUpdate4:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btnUpdate4:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(0, 214, 62, 0.5), .125rem .125rem 1rem rgba(0, 214, 62, 0.5);
}

.btnUpdate5{
  background: linear-gradient(to bottom right, #004FC9 ,#4B91FD);
  border: 0;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.btnUpdate5:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btnUpdate5:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(30, 102, 214, 0.5), .125rem .125rem 1rem rgba(30, 102, 214 , 0.5);
}


.circular--square {
  border-radius: 50%;
}
.circular--square {
    width:9vh;
    height:9vh;
}

.circular--squareFeed {
  border-radius: 50%;
  width: 6vh;
  height: 6vh;
}
.ContenidoUsLogeado1 {
  background-color:#212F3D;
  background-image: url('assets/images/Klyns1.png');
}
.ContenidoUsLogeado2 {
  background-color:#FDFEFE;
}

.ImgColaboradores {
  border-radius: 50%;
  width:15vh;
  height:15vh;
  /* object-fit:cover; */
}
@media only screen and (max-width: 600px) {
  .ImgColaboradores {
    border-radius: 50%;
    width:25vh;
    height:25vh;
    object-fit:cover;
  }
  .circular--squareFeed {
    border-radius: 50%;
    width:6vh;
    height:6vh;
    object-fit:cover;
  }
  .ContenidoUsLogeado1 {
    background-color:#212F3D;
    background-image: url('assets/images/Klyns1.png');
  }
  .ContenidoUsLogeado2 {
    background-color:#FDFEFE;
    height:45vh
  }
}

.textRevisado {
   /* color: linear-gradient(to right, #0575E6 0%, #021B79  51%, #0575E6  100%); */
  font-size: 2em;
  background: -webkit-linear-gradient(#0575E6, #021B79);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 }

 .btn-ViewUpdateSm {
  align-items: center;
  background-color: #0036DE;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
 }

 .btn-ViewUpdateSm:hover,
 .btn-ViewUpdateSm:focus {
  background-color: #0C2472;
  color: #ffffff;
 }

 .btn-ViewUpdateSm:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
 }

 .btn-ViewUpdateSm:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, .08);
  color: rgba(0, 0, 0, .3);
 }

 .btn-ViewDetail {
   min-width: 100px;
   height: 40px;
   color: #fff;
   padding: 5px 10px;
   font-weight: bold;
   cursor: pointer;
   transition: all 0.3s ease;
   position: relative;
   display: inline-block;
   outline: none;
   border-radius: 5px;
   z-index: 0;
   background: #fff;
   overflow: hidden;
   border: 1px solid #4433ff;
   color: #4433ff;
 }
 .btn-ViewDetail:hover {
   color: #fff;
 }
 .btn-ViewDetail:hover:after {
   width: 100%;
 }
 .btn-ViewDetail:after {
   content: "";
   position: absolute;
   z-index: -1;
   transition: all 0.3s ease;
   left: 0;
   top: 0;
   width: 0;
   height: 100%;
   background: #4433ff;
 }

 .btn-true {
   min-width: 100px;
   height: 40px;
   color: #fff;
   padding: 5px 10px;
   font-weight: bold;
   cursor: pointer;
   transition: all 0.3s ease;
   position: relative;
   display: inline-block;
   outline: none;
   border-radius: 5px;
   z-index: 0;
   background: #fff;
   overflow: hidden;
   border: 1px solid #00E163;
   color: #00E163;
 }
 .btn-true:hover {
   color: #fff;
 }
 .btn-true:hover:after {
   width: 100%;
 }
 .btn-true:after {
   content: "";
   position: absolute;
   z-index: -1;
   transition: all 0.3s ease;
   left: 0;
   top: 0;
   width: 0;
   height: 100%;
   background: #00E163;
 }

 .btn-change {
   min-width: 100px;
   height: 40px;
   color: #fff;
   padding: 5px 10px;
   font-weight: bold;
   cursor: pointer;
   transition: all 0.3s ease;
   position: relative;
   display: inline-block;
   outline: none;
   border-radius: 5px;
   z-index: 0;
   background: #fff;
   overflow: hidden;
   border: 1px solid #0004F1;
   color: #0004F1;
 }
 .btn-change:hover {
   color: #fff;
 }
 .btn-change:hover:after {
   width: 100%;
 }
 .btn-change:after {
   content: "";
   position: absolute;
   z-index: -1;
   transition: all 0.3s ease;
   left: 0;
   top: 0;
   width: 0;
   height: 100%;
   background: #0004F1;
 }




 .btn-cancel {
   min-width: 100px;
   height: 40px;
   color: #fff;
   padding: 5px 10px;
   font-weight: bold;
   cursor: pointer;
   transition: all 0.3s ease;
   position: relative;
   display: inline-block;
   outline: none;
   border-radius: 5px;
   z-index: 0;
   background: #fff;
   overflow: hidden;
   border: 1px solid #F10007;
   color: #F10007;
 }
 .btn-cancel:hover {
   color: #fff;
 }
 .btn-cancel:hover:after {
   width: 100%;
 }
 .btn-cancel:after {
   content: "";
   position: absolute;
   z-index: -1;
   transition: all 0.3s ease;
   left: 0;
   top: 0;
   width: 0;
   height: 100%;
   background: #F10007;
 }

 .btn-add {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border-radius: calc(45px/2);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background: linear-gradient(144deg,#af40ff,#5b42f3 50%,#00ddeb);
}

/* plus sign */
.sign {
  width: 100%;
  font-size: 2.2em;
  color: white;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.4em;
  font-weight: 500;
  transition-duration: .3s;
}
/* hover effect on button width */
.btn-add:hover {
  width: 145px;
  transition-duration: .3s;
}

.btn-add:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 15px;
}
/* hover effect button's text */
.btn-add:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 15px;
}
/* button click effect*/
.btn-add:active {
  transform: translate(2px ,2px);
}

.btn-block {
  min-width: 100px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #212121;
  color: #212121;
}
.btn-block:hover {
  color: #fff;
}
.btn-block:hover:after {
  width: 100%;
}
.btn-block:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #212121;
}

.statustemp.e-inactivecolor {
    background-color: #ffd7cc;
    width: 100%;
}
.statustxt.e-inactivecolor {
    color: #e60000;
}
.statustemp.e-activecolor {
    background-color: #ccffcc;
    width: 100%;
}
.statustxt.e-activecolor {
    color: #00cc00;
}

.btn-actionBlue {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #3498DB;
  color: #3498DB;
  margin: 0 auto;
  display: block;
}
.btn-actionBlue:hover {
  color: #fff;
}
.btn-actionBlue:hover:after {
  width: 100%;
}
.btn-actionBlue:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #3498DB;
}

.btn-actionBlue1 {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #4a5989;
  color: #4a5989;
  margin: 0 auto;
  display: block;
}
.btn-actionBlue1:hover {
  color: #fff;
}
.btn-actionBlue1:hover:after {
  width: 100%;
}
.btn-actionBlue1:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #4a5989;
}

.btn-actionRed {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #af0505;
  color: #af0505;
  margin: 0 auto;
  display: block;
}
.btn-actionRed:hover {
  color: #fff;
}
.btn-actionRed:hover:after {
  width: 100%;
}
.btn-actionRed:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #af0505;
}


.statustemp.e-propuesto {
    background-color: #a7ecfa;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-propuesto {
    color: #175773;
}
.statustemp.e-aceptado {
    background-color: #ff9add;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-aceptado {
    color: #b80059;
}
.statustemp.e-cancelado {
    background-color: #ff9292;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-cancelado {
    color: #940808;
}
.statustemp.e-terminado {
    background-color: #b9ff95;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-terminado {
    color: #22690b;
}
.statustemp.e-progreso {
    background-color: #ffcfa5;
    width: 100%;
    border-radius: 10px;
}
.statustxt.e-progreso {
    color: #cc2b02;
}

.btn-actionGreen {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #0f5812;
  color: #0f5812;
  margin: 0 auto;
  display: block;
}
.btn-actionGreen:hover {
  color: #fff;
}
.btn-actionGreen:hover:after {
  width: 100%;
}
.btn-actionGreen:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #0f5812;
}

.btn-actionOrange {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #da4d00;
  color: #da4d00;
  margin: 0 auto;
  display: block;
}
.btn-actionOrange:hover {
  color: #fff;
}
.btn-actionOrange:hover:after {
  width: 100%;
}
.btn-actionOrange:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #da4d00;
}


.delete-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.delete-svgIcon {
  width: 15px;
  transition-duration: 0.3s;
}

.delete-svgIcon path {
  fill: white;
}

.btn-iconRed {
  background-color: #ff96ae;
  color: #fff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 0px;
}
.btn-iconRed:hover {
  background-color: #b60040;
}
.btn-iconRed:focus {
  background-color: #b60040;
}

.btn-actionRed1 {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #4d0000;
  color: #4d0000;
  margin: 0 auto;
  display: block;
}
.btn-actionRed1:hover {
  color: #fff;
}
.btn-actionRed1:hover:after {
  width: 100%;
}
.btn-actionRed1:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #4d0000;
}

.btn-actionPink {
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #ff004c;
  color: #ff004c;
  margin: 0 auto;
  display: block;
}
.btn-actionPink:hover {
  color: #fff;
}
.btn-actionPink:hover:after {
  width: 100%;
}
.btn-actionPink:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #ff004c;
}

.btn-disabled {
  cursor: not-allowed;
  width:80%;
  height: 100%;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 1px solid #4f4f4f;
  color: #4f4f4f;
  margin: 0 auto;
  display: block;
}
.btn-disabled:hover {
  color: #fff;
}
.btn-disabled:hover:after {
  width: 100%;
}
.btn-disabled:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #4f4f4f;
}

.text-comments {
  cursor: pointer;
}
.text-comments:hover {
  text-decoration: underline;
}

.dv-buttonGroup {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center; /* Centra verticalmente los elementos */
  justify-content: center; /* Centra horizontalmente los elementos */
}
.dv-buttonGroup:hover {
  background-color: #c8c8c8;
}
.dvContent-buttonGroup {
  height: 45px;
  border-top: 1px solid #212121;
  border-bottom: 1px solid #212121;
}

.content-reactionComm {
  position: absolute;
  bottom: 0px;
  right: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.content-reactionCommMD {
  position: absolute;
  bottom: 5px;
  left: -5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.content-reactionCommD{
  position: absolute;
  bottom: 0px;
  left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.reactionComm{
  position: absolute;
  bottom: 100px;
  right: 40%;
  background-color: #262626;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #FFF;
  opacity:.95;
  text-align: center;
  display: none;

  z-index: 999999;
  max-height:45vh;
  width: 240px;
  font-size: 12px !important;
}

.reactionComm ul {
  list-style-type: none; /* Elimina los puntos de la lista */
  padding: 5px !important; /* Elimina el padding del ul */
  margin: 0 !important; /* Elimina el margen del ul */
}

.reactionComm li {
  margin: 0 !important; /* Elimina el margen entre los li */
  padding: 4px !important; /* Ajusta el padding interno si es necesario */
}

.reactionCommM{
  position: absolute;
  bottom: 100px;
  right: 30%;
  background-color: #262626;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #FFF;
  z-index: 999999;
  max-height:45vh;
  width: 240px;
  opacity:.95;
  font-size: 12px !important;
  text-align: center;
  display: none;
}

.reactionCommM ul {
  list-style-type: disc !important; /* Añade puntos al inicio de los elementos li */
  padding: 0; /* Elimina el padding del ul */
  margin: 0; /* Elimina el margen del ul */
}

.reactionCommM li {
  margin: 0 !important; /* Elimina el margen entre los li */
  padding: 4px !important; /* Ajusta el padding interno si es necesario */
  list-style-position: inside; /* Asegura que el punto esté dentro del área de padding */
}

.menuMeGusta{
  display:none;
  position:absolute;
  z-index:9999;
  width:50%;
  background-color:#007B85;
  text-align:center;
  bottom:30%;
  left: 30%;
  border-radius:15px;
  color:white;
  padding: 5px;
  opacity:.95;
  max-height:45vh;
}

.menuMeGusta ul {
  list-style-type: disc !important; /* Añade puntos al inicio de los elementos li */
  padding: 0; /* Elimina el padding del ul */
  margin: 0; /* Elimina el margen del ul */
}

.menuMeGusta li {
  margin: 0 !important; /* Elimina el margen entre los li */
  padding: 4px !important; /* Ajusta el padding interno si es necesario */
  list-style-position: inside; /* Asegura que el punto esté dentro del área de padding */
}

.menuFelicitacion{
  display:none;position:absolute;
  z-index:9999;
  width:50%;
  background-color:#7F00A7;
  text-align:center;
  bottom:30%;
  left: 30%;
  border-radius:15px;
  opacity:1;
  color:white;
  padding: 5px;
  opacity:.95;
  max-height:45vh;
}

.menuFelicitacion ul {
  list-style-type: disc !important; /* Añade puntos al inicio de los elementos li */
  padding: 0; /* Elimina el padding del ul */
  margin: 0; /* Elimina el margen del ul */
}

.menuFelicitacion li {
  margin: 0 !important; /* Elimina el margen entre los li */
  padding: 4px !important; /* Ajusta el padding interno si es necesario */
  list-style-position: inside; /* Asegura que el punto esté dentro del área de padding */
}

/* Fix para dropdowns dentro de modals - permitir que el contenido se desborde */
.modal-dialog {
  overflow: visible !important;
}

.modal-content {
  overflow: visible !important;
}

.modal-body {
  overflow: visible !important;
}

.modal-backdrop {
  z-index: 1040 !important;
}

.modal {
  z-index: 1050 !important;
  overflow: visible !important;
}

/* Para select2 dentro de modals */
.select2-container {
  z-index: 99999 !important;
}

.select2-dropdown {
  z-index: 99999 !important;
}

/* Para otros dropdowns dentro de modals */
.modal .dropdown-menu {
  z-index: 10000 !important;
}

</style>
