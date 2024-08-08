export var PostStatus;
(function (PostStatus) {
  PostStatus["ACTIVE"] = "active";
  PostStatus["INACTIVE"] = "inactive";
})(PostStatus || (PostStatus = {}));
export var PostCategoriesEnum;
(function (PostCategoriesEnum) {
  PostCategoriesEnum["COMMON"] = "common";
  PostCategoriesEnum["ACTION"] = "\u0D06\u0D15\u0D4D\u0D37\u0D7B";
  PostCategoriesEnum["AMMAYIAMMA"] =
    "\u0D05\u0D2E\u0D4D\u0D2E\u0D3E\u0D2F\u0D3F\u0D05\u0D2E\u0D4D\u0D2E";
  PostCategoriesEnum["ANTYKADHAKAL"] =
    "\u0D06\u0D28\u0D4D\u0D31\u0D3F \u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["CHECHIKADHAKAL"] =
    "\u0D1A\u0D47\u0D1A\u0D4D\u0D1A\u0D3F \u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["CHERUKADHAKAL"] =
    "\u0D1A\u0D46\u0D31\u0D41\u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["CINEMAKAMBHIKADHAKAL"] =
    "\u0D38\u0D3F\u0D28\u0D3F\u0D2E \u0D15\u0D2E\u0D4D\u0D2A\u0D3F\u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["CRIMETHRILLER"] =
    "\u0D15\u0D4D\u0D30\u0D48\u0D02 \u0D24\u0D4D\u0D30\u0D3F\u0D32\u0D4D\u0D32\u0D46\u0D7C";
  PostCategoriesEnum["ENGLISHNOVELS"] =
    "\u0D07\u0D02\u0D17\u0D4D\u0D32\u0D40\u0D37\u0D4D \u0D28\u0D4B\u0D35\u0D7D\u0D38\u0D4D";
  PostCategoriesEnum["ENTERTIMENT"] =
    "\u0D0E\u0D28\u0D4D\u0D31\u0D7C\u0D1F\u0D48\u0D7B\u0D2E\u0D46\u0D28\u0D4D\u0D31\u0D4D";
  PostCategoriesEnum["FAMILY"] = "\u0D2B\u0D3E\u0D2E\u0D3F\u0D32\u0D3F";
  PostCategoriesEnum["HORRRFISION"] =
    "\u0D39\u0D4A\u0D31\u0D7C \u0D2B\u0D3F\u0D15\u0D4D\u0D37\u0D7B";
  PostCategoriesEnum["KADHAKAL"] = "\u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["KAMBHICARTOON"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D15\u0D3E\u0D7C\u0D1F\u0D4D\u0D1F\u0D42\u0D7A";
  PostCategoriesEnum["KAMBHIGAMES"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D17\u0D46\u0D2F\u0D3F\u0D02\u0D38\u0D4D";
  PostCategoriesEnum["KAMBHIJOCKS"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D1C\u0D4B\u0D15\u0D4D\u0D38\u0D4D";
  PostCategoriesEnum["KAMBHINEWS"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D28\u0D4D\u0D2F\u0D42\u0D38\u0D4D\u200C";
  PostCategoriesEnum["KAMBHINOVELS"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D28\u0D4B\u0D35\u0D7D\u0D38\u0D4D";
  PostCategoriesEnum["KAMBHIPATTUKAL"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D2A\u0D3E\u0D1F\u0D4D\u0D1F\u0D41\u0D15\u0D7E";
  PostCategoriesEnum["KAMBHIPHONES"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D2B\u0D4B\u0D7A";
  PostCategoriesEnum["KAMBHITEACHER"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D1F\u0D40\u0D1A\u0D4D\u0D1A\u0D7C";
  PostCategoriesEnum["KAMBHIKADHAKAL"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F\u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["KAMBHIKADHAKALAUDIO"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F\u0D15\u0D25\u0D15\u0D7E \u0D13\u0D21\u0D3F\u0D2F\u0D4B";
  PostCategoriesEnum["KAMBHIKADHAKALPDF"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F\u0D15\u0D25\u0D15\u0D7E PDF";
  PostCategoriesEnum["KAMBHIPADAM"] =
    "\u0D15\u0D2E\u0D4D\u0D2A\u0D3F\u0D2A\u0D1F\u0D02";
  PostCategoriesEnum["LOVESTORIES"] =
    "\u0D32\u0D35\u0D4D \u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4B\u0D31\u0D40\u0D38\u0D4D";
  PostCategoriesEnum["PDFKAMBHIKADHAKAL"] =
    "PDF \u0D15\u0D2E\u0D4D\u0D2A\u0D3F \u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["AVIHITHAM"] =
    "\u0D05\u0D35\u0D3F\u0D39\u0D3F\u0D24\u0D02";
  PostCategoriesEnum["EROTICLOVESTORIES"] =
    "\u0D07\u0D31\u0D4B\u0D1F\u0D4D\u0D1F\u0D3F\u0D15\u0D4D \u0D32\u0D35\u0D4D \u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4B\u0D31\u0D40\u0D38\u0D4D";
  PostCategoriesEnum["OLINJUNOTTAM"] =
    "\u0D12\u0D33\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D \u0D28\u0D4B\u0D1F\u0D4D\u0D1F\u0D02";
  PostCategoriesEnum["KUKOLS"] =
    "\u0D15\u0D41\u0D15\u0D4D\u0D15\u0D4B\u0D7E\u0D21\u0D4D";
  PostCategoriesEnum["KOWMARAM"] = "\u0D15\u0D57\u0D2E\u0D3E\u0D30\u0D02";
  PostCategoriesEnum["GAY"] = "\u0D17\u0D47";
  PostCategoriesEnum["CHEETING"] =
    "\u0D1A\u0D40\u0D31\u0D4D\u0D31\u0D3F\u0D02\u0D17\u0D4D";
  PostCategoriesEnum["NIDHISHTTASANGAMAM"] =
    "\u0D28\u0D3F\u0D37\u0D3F\u0D26\u0D4D\u0D27 \u0D38\u0D02\u0D17\u0D2E\u0D02";
  PostCategoriesEnum["FANTACY"] = "\u0D2B\u0D3E\u0D28\u0D4D\u0D31\u0D38\u0D3F";
  PostCategoriesEnum["FAMDOM"] = "\u0D2B\u0D46\u0D02\u0D21\u0D02";
  PostCategoriesEnum["FATISH"] =
    "\u0D2B\u0D46\u0D31\u0D4D\u0D31\u0D3F\u0D37\u0D4D";
  PostCategoriesEnum["MANMADHAM"] = "\u0D2E\u0D28\u0D4D\u0D2E\u0D25\u0D02";
  PostCategoriesEnum["RATHIANUBHAVANGAL"] =
    "\u0D30\u0D24\u0D3F\u0D05\u0D28\u0D41\u0D2D\u0D35\u0D19\u0D4D\u0D19\u0D7E";
  PostCategoriesEnum["REALKADHAL"] =
    "\u0D31\u0D3F\u0D2F\u0D7D \u0D15\u0D25\u0D15\u0D7E";
  PostCategoriesEnum["LESBIAN"] =
    "\u0D32\u0D46\u0D38\u0D4D\u0D2C\u0D3F\u0D2F\u0D7B";
  PostCategoriesEnum["SANGHAMCHERNNU"] =
    "\u0D38\u0D02\u0D18\u0D02 \u0D1A\u0D47\u0D7C\u0D28\u0D4D\u0D28\u0D4D";
})(PostCategoriesEnum || (PostCategoriesEnum = {}));
export var PostTag;
(function (PostTag) {
  PostTag["TRENDING"] = "trending";
})(PostTag || (PostTag = {}));
export var CommentType;
(function (CommentType) {
  CommentType["MAIN"] = "main";
  CommentType["REPLY"] = "reply";
})(CommentType || (CommentType = {}));
