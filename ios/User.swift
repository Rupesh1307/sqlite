//
//  User.swift
//  ezsub
//
//  Created by Transform-Hub on 20/12/22.
//

import Foundation

class User{
  
      var Username: String=""
      var Email: String=""
      var id: Int=0
      
  init(id:Int, Username:String, Email:String)
      {
        self.id = id;
        self.Username = Username;
        self.Email = Email;
      }
}
