import React, { useState, useEffect } from "react";
import sdk from "@farcaster/frame-sdk";
import { Bell, Check } from "lucide-react";

const CastMinder = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setNotificationDetails(context?.client.notificationDetails ?? null);

      sdk.on("frameAdded", ({ notificationDetails }) => {
        if (notificationDetails) {
          setNotificationDetails(notificationDetails);
        }
      });

      sdk.actions.ready({});
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  const handleAddFrame = async () => {
    try {
      const result = await sdk.actions.addFrame();
      if (result.notificationDetails) {
        setNotificationDetails(result.notificationDetails);
      }
    } catch (error) {
      console.error("Error adding frame:", error);
    }
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
      className="max-w-md mx-auto p-6"
    >
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">CastMinder</h1>

        {!notificationDetails ? (
          <div>
            <p className="mb-4">Enable notifications to get reminded!</p>
            <button
              onClick={handleAddFrame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 w-full"
            >
              <Bell className="w-4 h-4" />
              <span>Enable Notifications</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-green-700">Notifications enabled!</p>
            </div>
            <p className="text-sm text-gray-500">
              Select a duration and set your reminder in Farcaster
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CastMinder;
