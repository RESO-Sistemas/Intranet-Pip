<?php include("AutorizaPagina.php"); ?>
<?php
  include("verifica.php");
  require_once("Backend/Feed/Feed.php");
  $Feed = new Feed();
  $Feed->insertaFeedBirthday();

  $Feed2 = new Feed();
  $Feed2->insertaFeedAnniversario();
 ?>
