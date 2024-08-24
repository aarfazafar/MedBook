"use client"
// import { createContext, useState, useEffect } from 'react';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// interface UserContextType {
//   user: any | null;
// }

// const UserContext = createContext<UserContextType>({ user: null });

// function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any | null>(null);

//   useEffect(() => {
//     async function getUserData() {
//       const { getUser } = getKindeServerSession();
//       const user = await getUser();
//       setUser(user);
//     }

//     getUserData();
//   }, []);

//   return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
// }

// export { UserContext, UserProvider };

// components/Posts/UserContext.tsx

// components/Posts/UserContext.tsx

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserContextType {
  user: any | null;
}

const UserContext = createContext<UserContextType>({ user: null });

interface UserProviderProps {
  children: ReactNode;
  initialUser: any;
}

function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<any | null>(initialUser);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
