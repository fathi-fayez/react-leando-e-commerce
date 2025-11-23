// import { createSlice } from "@reduxjs/toolkit";
// import actAuthLogin from "./act/actAuthLogin";
// import actAuthLogout from "./act/actAuthLogout";
// import Cookies from "js-cookie";

// const isProduction = "production";
// const isLocalhost =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1" ||
//   window.location.hostname === "192.168.1.9" ||
//   window.location.hostname === "192.168.101.15" ||
//   window.location.hostname === "192.168.62.86";

// const cookieOptions = {
//   path: "/",
//   sameSite: isLocalhost ? "Strict" : isProduction ? "None" : "Lax",
//   secure:
//     !isLocalhost && (isProduction || window.location.protocol === "https:"),
//   expires: 360,
// };

// let isLogoutInProgress = false;

// const clearAllTokenCookies = () => {
//   try {
//     Cookies.remove("token");
//     Cookies.remove("token", { path: "/" });
//     Cookies.remove("token", cookieOptions);
//     Cookies.remove("token", { ...cookieOptions, path: "/" });

//     const domains = [window.location.hostname, `.${window.location.hostname}`];
//     domains.forEach((domain) => {
//       try {
//         Cookies.remove("token", { path: "/", domain });
//         Cookies.remove("token", { ...cookieOptions, domain });
//       } catch (e) {
//         console.warn("Failed to clear cookie for domain:", domain);
//       }
//     });
//   } catch (error) {
//     console.error("Error clearing token cookies:", error);
//   }
// };

// const setTokenCookie = (token) => {
//   try {
//     Cookies.set("token", token, cookieOptions);

//     if (!Cookies.get("language")) {
//       Cookies.set("language", "en", cookieOptions);
//     }
//   } catch (error) {
//     console.error("Error setting token cookie:", error);
//   }
// };

// export const authMiddleware = (store) => (next) => (action) => {
//   if (
//     action.type === "auth/signout" ||
//     action.type === "auth/actAuthLogout/fulfilled" ||
//     action.type === "auth/actAuthLogout/rejected"
//   ) {
//     isLogoutInProgress = true;
//     clearAllTokenCookies();
//     localStorage.removeItem("vendorId");
//   }

//   if (action.type === "auth/actAuthLogin/fulfilled" && !isLogoutInProgress) {
//     const token = action.payload?.data?.token?.access_token;
//     const vendorId = action.payload?.data?.admin?.vendor?.id;
//     const is_Admin = action.meta?.arg?.formData?.is_Admin;

//     if (token) {
//       setTokenCookie(token);
//       isLogoutInProgress = false;
//     }

//     if (vendorId) {
//       localStorage.setItem("vendorId", vendorId);
//     } else {
//       localStorage.setItem("vendorId", null);
//     }

//     if (typeof is_Admin === "boolean") {
//       localStorage.setItem("is_Admin", JSON.stringify(is_Admin));
//     }
//   }

//   if (action.type === "auth/updateToken" && !isLogoutInProgress) {
//     const token = action.payload;
//     if (token) {
//       setTokenCookie(token);
//     }
//   }

//   if (action.type === "auth/actAuthLogin/fulfilled") {
//     isLogoutInProgress = false;
//   }

//   return next(action);
// };

// const getInitialToken = () => {
//   if (isLogoutInProgress) {
//     return null;
//   }
//   try {
//     return Cookies.get("token") || null;
//   } catch (error) {
//     console.error("Error getting initial token:", error);
//     return null;
//   }
// };

// const getInitialKhrb = () => {
//   try {
//     const stored = localStorage.getItem("is_Admin") || true;
//     return stored !== null ? JSON.parse(stored) : true;
//   } catch {
//     return true;
//   }
// };

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   accessToken: getInitialToken(),
//   is_Admin: getInitialKhrb(),
//   isLoggingOut: false,
//   forceLogoutMode: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.is_Admin = true;
//       state.isLoggingOut = false;
//       state.error = null;
//       state.forceLogoutMode = false;
//       state.loading = false;
//     },
//     forceLogout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.is_Admin = true;
//       state.isLoggingOut = false;
//       state.error = null;
//       state.forceLogoutMode = true;
//       state.loading = false;
//     },
//     resetUI: (state) => {
//       state.loading = false;
//       state.error = null;
//     },
//     setIsKhrb: (state, action) => {
//       state.is_Admin = action.payload;
//       localStorage.setItem("is_Admin", JSON.stringify(action.payload));
//     },
//     updateToken: (state, action) => {
//       if (!state.forceLogoutMode && !isLogoutInProgress) {
//         state.accessToken = action.payload;
//       }
//     },
//     setLoggingOut: (state, action) => {
//       state.isLoggingOut = action.payload;
//     },
//     clearForceLogoutMode: (state) => {
//       state.forceLogoutMode = false;
//       isLogoutInProgress = false;
//     },
//     resetAuthState: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.is_Admin = true;
//       state.isLoggingOut = false;
//       state.error = null;
//       state.forceLogoutMode = false;
//       state.loading = false;
//       localStorage.removeItem("vendorId");
//       localStorage.removeItem("is_Admin");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(actAuthLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.isLoggingOut = false;
//       })
//       .addCase(actAuthLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.forceLogoutMode = false;
//         state.isLoggingOut = false;
//         state.user = action.payload.data;

//         const tokenData = action?.payload?.data?.token;
//         if (tokenData?.access_token) {
//           state.accessToken = tokenData.access_token;
//         }
//         const is_Admin = action.meta?.arg?.formData?.is_Admin;
//         if (typeof is_Admin === "boolean") {
//           state.is_Admin = is_Admin;
//         }
//       })
//       .addCase(actAuthLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isLoggingOut = false;
//       })
//       .addCase(actAuthLogout.pending, (state) => {
//         state.loading = true;
//         state.isLoggingOut = true;
//       })
//       .addCase(actAuthLogout.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.accessToken = null;
//         state.is_Admin = true;
//         state.isLoggingOut = false;
//         state.error = null;
//         state.forceLogoutMode = true;
//         localStorage.removeItem("vendorId");
//         localStorage.removeItem("is_Admin");
//       })
//       .addCase(actAuthLogout.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.user = null;
//         state.accessToken = null;
//         state.isLoggingOut = false;
//         state.forceLogoutMode = true;
//       });
//   },
// });

// export { actAuthLogin, actAuthLogout };
// export const {
//   signout,
//   resetUI,
//   setIsKhrb,
//   updateToken,
//   setLoggingOut,
//   clearForceLogoutMode,
//   forceLogout,
//   resetAuthState,
// } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import actAuthLogin from "./act/actAuthLogin";
import actAuthLogout from "./act/actAuthLogout";
import Cookies from "js-cookie";

const isProduction = "production";
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "192.168.1.9" ||
  window.location.hostname === "192.168.101.15" ||
  window.location.hostname === "192.168.62.86";

const cookieOptions = {
  path: "/",
  sameSite: isLocalhost ? "Strict" : isProduction ? "None" : "Lax",
  secure:
    !isLocalhost && (isProduction || window.location.protocol === "https:"),
  expires: 360,
};

let isLogoutInProgress = false;

const clearAllTokenCookies = () => {
  try {
    Cookies.remove("token");
    Cookies.remove("token", { path: "/" });
    Cookies.remove("token", cookieOptions);
    Cookies.remove("token", { ...cookieOptions, path: "/" });
    const domains = [window.location.hostname, `.${window.location.hostname}`];
    domains.forEach((domain) => {
      try {
        Cookies.remove("token", { path: "/", domain });
        Cookies.remove("token", { ...cookieOptions, domain });
      } catch (e) {
        console.warn("Failed to clear cookie for domain:", domain);
      }
    });
  } catch (error) {
    console.error("Error clearing token cookies:", error);
  }
};

const setTokenCookie = (token) => {
  try {
    Cookies.set("token", token, cookieOptions);
    if (!Cookies.get("language")) {
      Cookies.set("language", "en", cookieOptions);
    }
  } catch (error) {
    console.error("Error setting token cookie:", error);
  }
};

// Store permissions in localStorage for persistence
const storePermissions = (permissions) => {
  try {
    localStorage.setItem("userPermissions", JSON.stringify(permissions));
  } catch (error) {
    console.error("Error storing permissions:", error);
  }
};

const getStoredPermissions = () => {
  try {
    const stored = localStorage.getItem("userPermissions");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error getting stored permissions:", error);
    return {};
  }
};

const clearStoredPermissions = () => {
  try {
    localStorage.removeItem("userPermissions");
  } catch (error) {
    console.error("Error clearing stored permissions:", error);
  }
};

export const authMiddleware = (store) => (next) => (action) => {
  if (
    action.type === "auth/signout" ||
    action.type === "auth/actAuthLogout/fulfilled" ||
    action.type === "auth/actAuthLogout/rejected"
  ) {
    isLogoutInProgress = true;
    clearAllTokenCookies();
    clearStoredPermissions();
    localStorage.removeItem("vendorId");
    localStorage.removeItem("is_Admin");
  }

  if (action.type === "auth/actAuthLogin/fulfilled" && !isLogoutInProgress) {
    const token = action.payload?.data?.token?.access_token;
    const vendorId = action.payload?.data?.admin?.vendor?.id;
    const is_Admin = action.meta?.arg?.formData?.is_Admin;
    const permissions = action.payload?.data?.admin?.permissions?.permissions;

    if (token) {
      setTokenCookie(token);
      isLogoutInProgress = false;
    }

    if (vendorId) {
      localStorage.setItem("vendorId", vendorId);
    } else {
      localStorage.setItem("vendorId", null);
    }

    if (typeof is_Admin === "boolean") {
      localStorage.setItem("is_Admin", JSON.stringify(is_Admin));
    }

    if (permissions) {
      storePermissions(permissions);
    }
  }

  if (action.type === "auth/updateToken" && !isLogoutInProgress) {
    const token = action.payload;
    if (token) {
      setTokenCookie(token);
    }
  }

  if (action.type === "auth/actAuthLogin/fulfilled") {
    isLogoutInProgress = false;
  }

  return next(action);
};

const getInitialToken = () => {
  if (isLogoutInProgress) {
    return null;
  }
  try {
    return Cookies.get("token") || null;
  } catch (error) {
    console.error("Error getting initial token:", error);
    return null;
  }
};

const getInitialKhrb = () => {
  try {
    const stored = localStorage.getItem("is_Admin") || true;
    return stored !== null ? JSON.parse(stored) : true;
  } catch {
    return true;
  }
};

const initialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: getInitialToken(),
  is_Admin: getInitialKhrb(),
  permissions: getStoredPermissions(),
  isLoggingOut: false,
  forceLogoutMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.is_Admin = true;
      state.permissions = {};
      state.isLoggingOut = false;
      state.error = null;
      state.forceLogoutMode = false;
      state.loading = false;
    },
    forceLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.is_Admin = true;
      state.permissions = {};
      state.isLoggingOut = false;
      state.error = null;
      state.forceLogoutMode = true;
      state.loading = false;
    },
    resetUI: (state) => {
      state.loading = false;
      state.error = null;
    },
    setIsKhrb: (state, action) => {
      state.is_Admin = action.payload;
      localStorage.setItem("is_Admin", JSON.stringify(action.payload));
    },
    updateToken: (state, action) => {
      if (!state.forceLogoutMode && !isLogoutInProgress) {
        state.accessToken = action.payload;
      }
    },
    setLoggingOut: (state, action) => {
      state.isLoggingOut = action.payload;
    },
    clearForceLogoutMode: (state) => {
      state.forceLogoutMode = false;
      isLogoutInProgress = false;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.is_Admin = true;
      state.permissions = {};
      state.isLoggingOut = false;
      state.error = null;
      state.forceLogoutMode = false;
      state.loading = false;
      localStorage.removeItem("vendorId");
      localStorage.removeItem("is_Admin");
      clearStoredPermissions();
    },
    updatePermissions: (state, action) => {
      state.permissions = action.payload;
      storePermissions(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggingOut = false;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.forceLogoutMode = false;
        state.isLoggingOut = false;
        state.user = action.payload.data;

        const tokenData = action?.payload?.data?.token;
        if (tokenData?.access_token) {
          state.accessToken = tokenData.access_token;
        }

        const is_Admin = action.meta?.arg?.formData?.is_Admin;
        if (typeof is_Admin === "boolean") {
          state.is_Admin = is_Admin;
        }

        // Store permissions from login response
        const permissions =
          action.payload?.data?.admin?.permissions?.permissions;
        if (permissions) {
          state.permissions = permissions;
        }
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggingOut = false;
      })
      .addCase(actAuthLogout.pending, (state) => {
        state.loading = true;
        state.isLoggingOut = true;
      })
      .addCase(actAuthLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.is_Admin = true;
        state.permissions = {};
        state.isLoggingOut = false;
        state.error = null;
        state.forceLogoutMode = true;
        localStorage.removeItem("vendorId");
        localStorage.removeItem("is_Admin");
        clearStoredPermissions();
      })
      .addCase(actAuthLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
        state.permissions = {};
        state.isLoggingOut = false;
        state.forceLogoutMode = true;
      });
  },
});

export { actAuthLogin, actAuthLogout };
export const {
  signout,
  resetUI,
  setIsKhrb,
  updateToken,
  setLoggingOut,
  clearForceLogoutMode,
  forceLogout,
  resetAuthState,
  updatePermissions,
} = authSlice.actions;
export default authSlice.reducer;
