export var UserStatus;
(function (UserStatus) {
  UserStatus["ACTIVE"] = "active";
  UserStatus["INACTIVE"] = "inactive";
})(UserStatus || (UserStatus = {}));
export var UserRole;
(function (UserRole) {
  UserRole["USER"] = "user";
  UserRole["ADMIN"] = "admin";
  UserRole["AUTHOR"] = "author";
})(UserRole || (UserRole = {}));
export var UserApprovalStatus;
(function (UserApprovalStatus) {
  UserApprovalStatus["PENDING"] = "pending";
  UserApprovalStatus["APPROVED"] = "approved";
  UserApprovalStatus["REJECTED"] = "rejected";
})(UserApprovalStatus || (UserApprovalStatus = {}));
