#!/bin/sh
npx vtecxutil upload
npx webpack --env.entry=/components/index.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/login.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/change_password.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/complete_registration.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/forgot_password.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/login.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/signup.tsx --mode=production --env.externals=true
npx webpack --env.entry=/components/user_terms.tsx --mode=production --env.externals=true


# PWA
npx webpack --env.entry=/pwa/manifest.json --mode=production --env.externals=true
npx webpack --env.entry=/pwa/sw.js --mode=production --env.externals=true
npx vtecxutil upload:img
npx vtecxutil upload:pwa
npx vtecxutil upload:html