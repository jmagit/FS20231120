var DataTypes = require("sequelize").DataTypes;
var _Actor = require("./actor");
var _Address = require("./address");
var _Category = require("./category");
var _City = require("./city");
var _Country = require("./country");
var _Customer = require("./customer");
var _Film = require("./film");
var _FilmActor = require("./film-actor");
var _FilmCategory = require("./film-category");
var _FilmText = require("./film-text");
var _Inventory = require("./inventory");
var _Language = require("./language");
var _Payment = require("./payment");
var _Rental = require("./rental");
var _Staff = require("./staff");
var _Store = require("./store");

function initModels(sequelize) {
  var Actor = _Actor(sequelize, DataTypes);
  var Address = _Address(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var City = _City(sequelize, DataTypes);
  var Country = _Country(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  var Film = _Film(sequelize, DataTypes);
  var FilmActor = _FilmActor(sequelize, DataTypes);
  var FilmCategory = _FilmCategory(sequelize, DataTypes);
  var FilmText = _FilmText(sequelize, DataTypes);
  var Inventory = _Inventory(sequelize, DataTypes);
  var Language = _Language(sequelize, DataTypes);
  var Payment = _Payment(sequelize, DataTypes);
  var Rental = _Rental(sequelize, DataTypes);
  var Staff = _Staff(sequelize, DataTypes);
  var Store = _Store(sequelize, DataTypes);

  Actor.belongsToMany(Film, { as: 'filmIdFilms', through: FilmActor, foreignKey: "actorId", otherKey: "filmId" });
  Category.belongsToMany(Film, { as: 'filmIdFilmFilmCategories', through: FilmCategory, foreignKey: "categoryId", otherKey: "filmId" });
  Film.belongsToMany(Actor, { as: 'actorIdActors', through: FilmActor, foreignKey: "filmId", otherKey: "actorId" });
  Film.belongsToMany(Category, { as: 'categoryIdCategories', through: FilmCategory, foreignKey: "filmId", otherKey: "categoryId" });
  FilmActor.belongsTo(Actor, { as: "actor", foreignKey: "actorId"});
  Actor.hasMany(FilmActor, { as: "filmActors", foreignKey: "actorId"});
  Customer.belongsTo(Address, { as: "address", foreignKey: "addressId"});
  Address.hasMany(Customer, { as: "customers", foreignKey: "addressId"});
  Staff.belongsTo(Address, { as: "address", foreignKey: "addressId"});
  Address.hasMany(Staff, { as: "staffs", foreignKey: "addressId"});
  Store.belongsTo(Address, { as: "address", foreignKey: "addressId"});
  Address.hasMany(Store, { as: "stores", foreignKey: "addressId"});
  FilmCategory.belongsTo(Category, { as: "category", foreignKey: "categoryId"});
  Category.hasMany(FilmCategory, { as: "filmCategories", foreignKey: "categoryId"});
  Address.belongsTo(City, { as: "city", foreignKey: "cityId"});
  City.hasMany(Address, { as: "addresses", foreignKey: "cityId"});
  City.belongsTo(Country, { as: "country", foreignKey: "countryId"});
  Country.hasMany(City, { as: "cities", foreignKey: "countryId"});
  Payment.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
  Customer.hasMany(Payment, { as: "payments", foreignKey: "customerId"});
  Rental.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
  Customer.hasMany(Rental, { as: "rentals", foreignKey: "customerId"});
  FilmActor.belongsTo(Film, { as: "film", foreignKey: "filmId"});
  Film.hasMany(FilmActor, { as: "filmActors", foreignKey: "filmId"});
  FilmCategory.belongsTo(Film, { as: "film", foreignKey: "filmId"});
  Film.hasMany(FilmCategory, { as: "filmCategories", foreignKey: "filmId"});
  Inventory.belongsTo(Film, { as: "film", foreignKey: "filmId"});
  Film.hasMany(Inventory, { as: "inventories", foreignKey: "filmId"});
  Rental.belongsTo(Inventory, { as: "inventory", foreignKey: "inventoryId"});
  Inventory.hasMany(Rental, { as: "rentals", foreignKey: "inventoryId"});
  Film.belongsTo(Language, { as: "language", foreignKey: "languageId"});
  Language.hasMany(Film, { as: "films", foreignKey: "languageId"});
  Film.belongsTo(Language, { as: "originalLanguage", foreignKey: "originalLanguageId"});
  Language.hasMany(Film, { as: "originalLanguageFilms", foreignKey: "originalLanguageId"});
  Payment.belongsTo(Rental, { as: "rental", foreignKey: "rentalId"});
  Rental.hasMany(Payment, { as: "payments", foreignKey: "rentalId"});
  Payment.belongsTo(Staff, { as: "staff", foreignKey: "staffId"});
  Staff.hasMany(Payment, { as: "payments", foreignKey: "staffId"});
  Rental.belongsTo(Staff, { as: "staff", foreignKey: "staffId"});
  Staff.hasMany(Rental, { as: "rentals", foreignKey: "staffId"});
  Store.belongsTo(Staff, { as: "managerStaff", foreignKey: "managerStaffId"});
  Staff.hasMany(Store, { as: "managerStaffStores", foreignKey: "managerStaffId"});
  Customer.belongsTo(Store, { as: "store", foreignKey: "storeId"});
  Store.hasMany(Customer, { as: "customers", foreignKey: "storeId"});
  Inventory.belongsTo(Store, { as: "store", foreignKey: "storeId"});
  Store.hasMany(Inventory, { as: "inventories", foreignKey: "storeId"});
  Staff.belongsTo(Store, { as: "store", foreignKey: "storeId"});
  Store.hasMany(Staff, { as: "staffs", foreignKey: "storeId"});

  return {
    Actor,
    Address,
    Category,
    City,
    Country,
    Customer,
    Film,
    FilmActor,
    FilmCategory,
    FilmText,
    Inventory,
    Language,
    Payment,
    Rental,
    Staff,
    Store,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
