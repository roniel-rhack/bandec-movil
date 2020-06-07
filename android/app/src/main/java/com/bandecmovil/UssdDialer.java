package com.bandecmovil;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.romellfudi.ussdlibrary.USSDApi;
import com.romellfudi.ussdlibrary.USSDController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

public class UssdDialer extends ReactContextBaseJavaModule{
    private static ReactApplicationContext reactContext;
    public HashMap<String, HashSet<String>> map;
    USSDApi ussdApi;

    public UssdDialer(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.map = new HashMap<>();
        this.map.put("KEY_LOGIN",new HashSet<>(Arrays.asList("espere", "waiting", "loading", "esperando")));
        this.map.put("KEY_ERROR",new HashSet<>(Arrays.asList("problema", "problem", "error", "null")));

        USSDController.verifyAccesibilityAccess(UssdDialer.reactContext);

        this.ussdApi = USSDController.getInstance(UssdDialer.reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "UssdDialer";
    }

    @ReactMethod
    public void autenticateUSSDCode(String code){
        ussdApi.callUSSDInvoke("*444*40*02#", this.map, new USSDController.CallbackInvoke() {
            @Override
            public void responseInvoke(String message) {
                // first option list - select option 1
                ussdApi.send(code,new USSDController.CallbackMessage(){
                    @Override
                    public void responseMessage(String message) {
                        // second option list - select option 1
                        System.out.println(message);
                    }
                });
            }

            @Override
            public void over(String message) {
                // message has the response string data from USSD
                // response no have input text, NOT SEND ANY DATA
            }

        });
    }
}
