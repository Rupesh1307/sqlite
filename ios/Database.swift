//
//  Database.swift
//  SqliteDb
//
//  Created by Transform-Hub on 20/12/22.
//

import Foundation

@objc(DataBase)
class DataBase:RCTEventEmitter{
   
  static let shareDatabaseOpen = DataBase()
  
  let dbPath: String = "singlife.sqlite"
  var db:OpaquePointer?
  
  func openDatabase() ->(String?)
        {
            let fileURL = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
                .appendingPathComponent(dbPath)
            //var db: OpaquePointer? = nil
            if sqlite3_open(fileURL.path, &db) != SQLITE_OK
            {
              return ("error opening database");
            }
            else
            {
              let key = "Rupesh"
              sqlite3_key(db, key, Int32(key.utf8.count))
              return("Successfully opened connection to database at \(dbPath)")
            }
        }
  
  func createTable()->String?{
            let createTableString = "CREATE TABLE IF NOT EXISTS User(Id INTEGER PRIMARY KEY,Username VARCHAR(20), Email VARCHAR(50), Age INTEGER)";
            var response:String?;
            var createTableStatement: OpaquePointer? = nil
            if sqlite3_prepare_v2(db, createTableString, -1, &createTableStatement, nil) == SQLITE_OK
            {
                if sqlite3_step(createTableStatement) == SQLITE_DONE
                {
                  response = "Table is created.";
                } else {
                  response = "Table could not be created.";
                }
            } else {
              response = "CREATE TABLE statement could not be prepared.";
            }
            sqlite3_finalize(createTableStatement)
      return response;
     }
  
  // Insert Data Query
   
  func insertData(UserName:String,Email:String,age:Int) ->(Any)
  {
      var insert :OpaquePointer?
      let response:Any;
      let InsertData = "Insert into User(Username,Email,Age) values(?,?,?);"
      
      if sqlite3_prepare_v2(db, InsertData, -1, &insert, nil) == SQLITE_OK
      {
          sqlite3_bind_text(insert, 1,( UserName as NSString).utf8String, -1, nil)
          sqlite3_bind_text(insert, 2,( Email as NSString).utf8String, -1, nil)
          sqlite3_bind_int(insert, 3, Int32(age))
          
          if sqlite3_step(insert) == SQLITE_DONE
          {
            response = ["status":true,"message":"Data inserted successfully"];
          }
          else{

            response = ["status":false,"message":"Data is not inserted."];
          }
          sqlite3_reset(insert)
      }
      else
      {
        response = ["status":false,"message":" insert statement could not be prepared."];
      }
      sqlite3_finalize(insert)
     return response;
  }
  
  // Retrive Data Query
  
  func readData ()->[Any]
  {
      var queryStatement : OpaquePointer?
      let selectQuery = "Select Id,Username,Email from User; "
      var response : [Any] = []
      
      if sqlite3_prepare_v2(db, selectQuery, -1, &queryStatement, nil) == SQLITE_OK
      {
          if sqlite3_step(queryStatement) == SQLITE_ROW
          {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
              let Id = Int(sqlite3_column_int(queryStatement, 0));
              let Username = String(describing: String(cString: sqlite3_column_text(queryStatement, 1)));
              let Email = String(describing: String(cString:sqlite3_column_text(queryStatement, 2)));
//              let Age = Int(sqlite3_column_int(queryStatement, 3));
              response.append(["id":Id,"username":Username,"email":Email]);
                        }
          }
          
      }
      
      sqlite3_finalize(queryStatement)
    return response;
  }
  
  override func supportedEvents() -> [String]! {
     return ["Database"]
   }
  
  
  @objc
   static override func requiresMainQueueSetup() -> Bool{
     return true;
   }
  
  @objc
   func OpenDatabase(_ resolve:RCTPromiseResolveBlock , reject:RCTPromiseRejectBlock){
     resolve(openDatabase());
   }
  
  @objc
    func CreateTable(_ resolve:RCTPromiseResolveBlock , reject:RCTPromiseRejectBlock){
      resolve(createTable());
    }

  @objc
  func Insert(_ username:String,email:String,age:Int, resolve:RCTPromiseResolveBlock , reject:RCTPromiseRejectBlock){
    let response = insertData(UserName: username, Email: email,age: age);
      resolve(response);
    }
  
  @objc
  func Read(_ resolve:RCTPromiseResolveBlock , reject:RCTPromiseRejectBlock){
      resolve(readData());
    }
}
  

