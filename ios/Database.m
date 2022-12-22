//
//  Database.m
//  ezsub
//
//  Created by Transform-Hub on 20/12/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(DataBase,NSObject)
RCT_EXTERN_METHOD(OpenDatabase:
                 (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(CreateTable:
                  (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(Insert: (NSString)username
                  email: (NSString)email
                  age:(int)age
                  resolve: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(Read:
                  (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject)
@end
