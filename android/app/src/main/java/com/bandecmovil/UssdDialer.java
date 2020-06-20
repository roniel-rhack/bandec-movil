package com.bandecmovil;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.romellfudi.ussdlibrary.USSDApi;
import com.romellfudi.ussdlibrary.USSDController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

public class UssdDialer extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public HashMap<String, HashSet<String>> map;
    USSDApi ussdApi;

    public UssdDialer(ReactApplicationContext reactContext) {
        super(reactContext);
        UssdDialer.reactContext = reactContext;
        this.map = new HashMap<>();
        this.map.put("KEY_LOGIN", new HashSet<>(Arrays.asList("espere", "waiting", "loading", "esperando")));
        this.map.put("KEY_ERROR", new HashSet<>(Arrays.asList("problema", "problem", "error", "null")));

        USSDController.verifyAccesibilityAccess(UssdDialer.reactContext);

        this.ussdApi = USSDController.getInstance(UssdDialer.reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "UssdDialer";
    }

    @ReactMethod
    public void autenticateUSSDCode(String code, Promise promise) {
        try {
            ussdApi.callUSSDInvoke("*444*40*02#", this.map, new USSDController.CallbackInvoke() {
                @Override
                public void responseInvoke(String message) {
                    // first option list - select option 1
                    ussdApi.send(code, new USSDController.CallbackMessage() {
                        @Override
                        public void responseMessage(String message) {
                            // second option list - select option 1
                            promise.resolve(message);
                        }
                    });
                }

                @Override
                public void over(String message) {
                    // message has the response string data from USSD
                    // response no have input text, NOT SEND ANY DATA
                    promise.resolve(message);
                }

            });
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    @ReactMethod
    public void registerUSSDCode(String card, String name, String expireDate, Promise promise) {
        try {
            ussdApi.callUSSDInvoke("*444*49*02*" + card + "#", this.map, new USSDController.CallbackInvoke() {
                @Override
                public void responseInvoke(String message) {
                    // first option list - select option 1
                    ussdApi.send(expireDate, new USSDController.CallbackMessage() {
                        @Override
                        public void responseMessage(String message) {
                            ussdApi.send(name, new USSDController.CallbackMessage() {
                                @Override
                                public void responseMessage(String message) {
                                    promise.resolve(message);
                                }
                            });
                        }
                    });
                }

                @Override
                public void over(String message) {
                    // message has the response string data from USSD
                    // response no have input text, NOT SEND ANY DATA
                    promise.resolve(message);
                }

            });
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

}
