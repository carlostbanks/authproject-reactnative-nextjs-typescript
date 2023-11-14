import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView as NativeWebView } from 'react-native-webview';
import { useAuth } from '../../contexts/AuthContext';

export default function WebView() {
  const webViewRef = useRef<NativeWebView>(null);
  const { token } = useAuth();
  const [isReady, setReady] = useState(false); // state to track WebView readiness

  useEffect(() => {
    if (webViewRef.current) {
      if (token) {
        if (isReady) {
          const script = `
          document.cookie = "SESSION_TOKEN=${encodeURIComponent(token)}";
          window.location.reload();
          true; // needed for Android to trigger the callback
        `;
        webViewRef.current.injectJavaScript(script);
        }
      } else {
        const clearCookieScript = `
          document.cookie = "SESSION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.reload();
          true; // needed for Android to trigger the callback
        `;
        webViewRef.current.injectJavaScript(clearCookieScript);
      }
    }
  }, [token, isReady]);

  return (
    <View style={styles.container}>
      <NativeWebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_WEBAPP_ROOT as string }}
        onLoadEnd={() => setReady(true)} // Set the WebView as ready when it finishes loading
        javaScriptEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
