import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: #000;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ─── UTILS ─────────────────────────────────────────── */
  .center { text-align: center; }
  .wrap   { max-width: 800px; margin: 0 auto; padding: 0 20px; }
  .wrap-sm { max-width: 640px; margin: 0 auto; padding: 0 20px; }

  /* ─── TOP ALERT BAR ─────────────────────────────────── */
  .topbar {
    background: #c0392b;
    text-align: center;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
    border-bottom: 2px solid #e74c3c;
  }
  .topbar span { color: #2ecc40; font-weight: 700; }

  /* ─── NAV ────────────────────────────────────────────── */
  nav {
    background: #000;
    border-bottom: 1px solid #1a1a1a;
    padding: 18px 0;
    text-align: center;
  }
  .logo {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Oswald', sans-serif;
    font-size: 22px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: #fff; text-decoration: none;
  }
  .logo-icon {
    background: #e74c3c; color: #fff;
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 900;
  }
  .logo span { color: #2ecc40; }

  /* ─── SECTIONS ───────────────────────────────────────── */
  .sec         { padding: 60px 0; border-bottom: 1px solid #111; }
  .sec-black   { background: #000; }
  .sec-dark    { background: #0a0a0a; }
  .sec-darker  { background: #050505; }

  /* ─── HERO ───────────────────────────────────────────── */
  .hero { padding: 50px 0 40px; background: #000; }
  .hero-eyebrow {
    display: inline-block;
    font-family: 'Oswald', sans-serif; font-size: 13px;
    font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    color: #fff; border: 1px solid #444; padding: 5px 18px;
    margin-bottom: 28px;
  }
  .hero h1 {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(36px, 6vw, 62px);
    font-weight: 700; line-height: 1.08;
    margin-bottom: 20px; text-transform: uppercase;
  }
  .hero h1 .red   { color: #e74c3c; }
  .hero h1 .green { color: #2ecc40; }
  .hero h1 .white { color: #fff; }
  .hero-sub {
    font-size: clamp(15px, 2vw, 18px);
    color: rgba(255,255,255,0.8); line-height: 1.7;
    max-width: 680px; margin: 0 auto 10px;
  }
  .hero-sub .green { color: #2ecc40; font-weight: 700; }
  .hero-sub .red   { color: #e74c3c; font-weight: 700; }

  /* video placeholder */
  .video-wrap {
    max-width: 680px; margin: 36px auto 0;
    background: #111; border: 3px solid #2ecc40;
    border-radius: 6px; overflow: hidden; position: relative;
    box-shadow: 0 0 40px rgba(46,204,64,0.15);
  }
  .video-inner {
    aspect-ratio: 16/9;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .video-inner img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.55);
  }
  .play-btn {
    position: absolute;
    width: 72px; height: 72px; border-radius: 50%;
    background: #2ecc40; display: flex; align-items: center; justify-content: center;
    font-size: 26px; color: #000; cursor: pointer;
    box-shadow: 0 0 0 8px rgba(46,204,64,0.2);
    transition: transform 0.2s;
  }
  .play-btn:hover { transform: scale(1.08); }

  /* event pill */
  .event-pill {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid #333; background: #0d0d0d;
    padding: 12px 20px; border-radius: 4px;
    font-size: 14px; margin-bottom: 28px;
  }
  .event-pill .dot { width: 8px; height: 8px; border-radius: 50%; background: #e74c3c; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  .event-pill strong { color: #e74c3c; }
  .event-pill .slots { color: #2ecc40; font-weight: 700; }

  /* ─── BIG NUMBER CLAIM ───────────────────────────────── */
  .big-claim { padding: 60px 0; background: #000; text-align: center; }
  .big-claim .lead {
    font-size: clamp(16px,2vw,19px); color: rgba(255,255,255,0.7); margin-bottom: 12px;
  }
  .big-claim .lead em { color: #e74c3c; font-style: normal; font-weight: 700; }
  .big-claim .number {
    font-family: 'Oswald', sans-serif; font-size: clamp(52px, 9vw, 96px);
    font-weight: 700; color: #2ecc40; line-height: 1;
    text-shadow: 0 0 40px rgba(46,204,64,0.3);
  }
  .big-claim .sub { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 8px; }
  .creator-photo-wrap {
    max-width: 460px; margin: 32px auto 0;
    border-radius: 8px; overflow: hidden;
    border: 2px solid #2ecc40;
    background: #111;
    aspect-ratio: 4/3;
    position: relative;
  }
  .creator-photo-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    display: block; filter: brightness(0.85);
  }
  .creator-badge {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(0,0,0,0.85); padding: 10px 16px;
    font-size: 12px; color: #2ecc40; text-align: center; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
  }

  /* ─── FOR WHO ────────────────────────────────────────── */
  .for-who-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(22px, 3.5vw, 36px); font-weight: 700;
    text-align: center; margin-bottom: 32px; text-transform: uppercase;
    color: #e74c3c;
  }
  .check-red-list { list-style: none; display: flex; flex-direction: column; gap: 12px; max-width: 560px; margin: 0 auto; }
  .check-red-item {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 16px; line-height: 1.5;
  }
  .check-red-icon {
    width: 24px; height: 24px; border-radius: 50%; background: #e74c3c;
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 900; flex-shrink: 0; margin-top: 1px;
  }

  /* ─── RESULTS GRID ───────────────────────────────────── */
  .results-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 600; text-align: center;
    color: #2ecc40; margin-bottom: 32px; line-height: 1.4;
  }
  .vid-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .vid-card {
    background: #111; border: 1px solid #222; border-radius: 4px; overflow: hidden;
    cursor: pointer; transition: border-color 0.2s;
  }
  .vid-card:hover { border-color: #2ecc40; }
  .vid-thumb {
    aspect-ratio: 16/9; background: #1a1a1a;
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; position: relative; overflow: hidden;
  }
  .vid-thumb img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.65);
  }
  .vid-play {
    position: absolute; width: 44px; height: 44px; border-radius: 50%;
    background: rgba(46,204,64,0.9); display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: #000;
  }
  .vid-caption {
    padding: 10px 12px;
    font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700;
    text-transform: uppercase; line-height: 1.3;
  }
  .vid-caption .green { color: #2ecc40; }
  .vid-caption .red   { color: #e74c3c; }

  /* ─── SOCIAL PROOF WALL ──────────────────────────────── */
  .proof-wall { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
  .proof-card {
    background: #0d0d0d; border: 1px solid #1d1d1d; border-radius: 4px;
    padding: 16px; font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.5;
    cursor: default; transition: border-color 0.2s;
  }
  .proof-card:hover { border-color: #333; }
  .proof-card-name { font-weight: 700; color: #fff; margin-bottom: 4px; }
  .proof-card-amount { color: #2ecc40; font-weight: 700; font-size: 15px; }

  /* ─── MODULES 2-COL ──────────────────────────────────── */
  .days-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .day-box {
    border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden;
  }
  .day-header {
    font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 700;
    padding: 14px 20px; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .day-header.red  { background: #1a0505; color: #e74c3c; border-bottom: 2px solid #e74c3c; }
  .day-header.gold { background: #1a1200; color: #f39c12; border-bottom: 2px solid #f39c12; }
  .day-body { padding: 20px; background: #0d0d0d; }
  .day-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .day-list-item { display: flex; gap: 10px; font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.8); }
  .day-bullet { color: #2ecc40; font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  /* ─── CREATOR SECTION ────────────────────────────────── */
  .creator-sec-layout {
    display: grid; grid-template-columns: 260px 1fr; gap: 52px; align-items: start;
  }
  .creator-img-box {
    background: #111; border: 2px solid #2ecc40; border-radius: 4px;
    aspect-ratio: 3/4; overflow: hidden; position: relative;
  }
  .creator-img-box img {
    width: 100%; height: 100%; object-fit: cover; object-position: top;
    display: block; filter: brightness(0.9);
  }
  .creator-green-stripe {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: #2ecc40; padding: 10px;
    font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700;
    color: #000; text-align: center; text-transform: uppercase; letter-spacing: 0.08em;
  }
  .creator-name {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(28px, 4vw, 44px); font-weight: 700;
    text-transform: uppercase; line-height: 1.05; margin-bottom: 4px;
  }
  .creator-name .green { color: #2ecc40; }
  .creator-years {
    display: inline-block; background: #e74c3c;
    font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 14px; margin-bottom: 20px;
  }
  .creator-stats { display: flex; gap: 28px; flex-wrap: wrap; margin: 24px 0 28px; }
  .c-stat strong {
    font-family: 'Oswald', sans-serif; font-size: 38px; font-weight: 700;
    color: #2ecc40; display: block; line-height: 1;
  }
  .c-stat span { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ─── TESTIMONIALS ───────────────────────────────────── */
  .tgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .tcard {
    background: #0a0a0a; border: 1px solid #1d1d1d;
    border-radius: 4px; padding: 22px;
    transition: border-color 0.2s;
  }
  .tcard:hover { border-color: #2ecc40; }
  .tcard-stars { color: #f39c12; font-size: 15px; letter-spacing: 2px; margin-bottom: 12px; }
  .tcard-text {
    font-size: 14px; color: rgba(255,255,255,0.78); line-height: 1.7; margin-bottom: 18px;
  }
  .tcard-text .green { color: #2ecc40; font-weight: 700; }
  .tcard-author { display: flex; align-items: center; gap: 10px; }
  .tcard-av {
    width: 44px; height: 44px; border-radius: 50%;
    border: 2px solid #2ecc40; overflow: hidden; flex-shrink: 0;
  }
  .tcard-av img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .tcard-name { font-weight: 700; font-size: 13px; }
  .tcard-role { font-size: 11px; color: #555; }

  /* ─── GUARANTEE ──────────────────────────────────────── */
  .guarantee-badge {
    width: 160px; height: 160px; border-radius: 50%;
    border: 4px solid #e74c3c;
    background: radial-gradient(circle, #1a0505 0%, #000 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    box-shadow: 0 0 0 8px rgba(231,76,60,0.1);
  }
  .guarantee-badge .g-num {
    font-family: 'Oswald', sans-serif; font-size: 52px; font-weight: 700;
    color: #e74c3c; line-height: 1;
  }
  .guarantee-badge .g-label {
    font-size: 11px; color: rgba(255,255,255,0.6);
    text-transform: uppercase; letter-spacing: 0.1em; text-align: center;
  }

  /* ─── PRICING ────────────────────────────────────────── */
  .price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .price-card {
    border-radius: 6px; overflow: hidden; border: 2px solid;
  }
  .price-card.general { border-color: #e74c3c; }
  .price-card.vip     { border-color: #f39c12; }
  .price-header {
    padding: 18px 22px;
    font-family: 'Oswald', sans-serif; font-size: 22px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; text-align: center;
  }
  .price-header.general { background: #1a0505; color: #e74c3c; }
  .price-header.vip     { background: #1a1200; color: #f39c12; }
  .price-body { background: #0a0a0a; padding: 24px 22px; }
  .price-sub { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #555; text-align: center; margin-bottom: 4px; }
  .price-amount {
    font-family: 'Oswald', sans-serif; font-size: 58px; font-weight: 700;
    line-height: 1; text-align: center; margin-bottom: 4px;
    display: flex; align-items: flex-start; justify-content: center; gap: 4px;
  }
  .price-amount sup { font-size: 24px; margin-top: 10px; }
  .price-card.general .price-amount { color: #fff; }
  .price-card.vip .price-amount     { color: #f39c12; }
  .price-feature-list { list-style: none; margin: 20px 0 24px; display: flex; flex-direction: column; gap: 10px; }
  .price-feature { display: flex; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.4; }
  .pf-icon { flex-shrink: 0; font-size: 14px; }
  .price-card.general .pf-icon { color: #e74c3c; }
  .price-card.vip .pf-icon     { color: #f39c12; }
  .price-urgency { text-align: center; margin-top: 10px; font-size: 13px; font-style: italic; }
  .price-card.general .price-urgency { color: #e74c3c; }
  .price-card.vip .price-urgency     { color: #f39c12; }

  /* ─── CTA BUTTON ─────────────────────────────────────── */
  .btn-red, .btn-green, .btn-gold {
    display: block; width: 100%;
    font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em;
    padding: 16px 24px; border: none; border-radius: 4px;
    cursor: pointer; text-decoration: none; text-align: center;
    transition: all 0.2s;
  }
  .btn-red   { background: #e74c3c; color: #fff; }
  .btn-green { background: #2ecc40; color: #000; }
  .btn-gold  { background: #f39c12; color: #000; }
  .btn-red:hover   { background: #c0392b; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(231,76,60,0.4); }
  .btn-green:hover { background: #27ae60; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(46,204,64,0.4); }
  .btn-gold:hover  { background: #e67e22; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(243,156,18,0.4); }

  /* ─── BONUS BOX ──────────────────────────────────────── */
  .bonus-box {
    background: linear-gradient(135deg, #0d1f0d 0%, #0a1a0a 100%);
    border: 2px solid #2ecc40; border-radius: 6px; padding: 36px 40px;
    text-align: center; max-width: 600px; margin: 0 auto;
  }
  .bonus-title {
    font-family: 'Oswald', sans-serif; font-size: 34px; font-weight: 700;
    text-transform: uppercase; color: #2ecc40; margin-bottom: 8px;
  }
  .bonus-amount {
    font-family: 'Oswald', sans-serif; font-size: 56px; font-weight: 700;
    color: #fff; line-height: 1;
  }
  .bonus-check { list-style: none; margin: 20px 0 8px; text-align: left; display: flex; flex-direction: column; gap: 8px; max-width: 360px; margin: 20px auto 8px; }
  .bonus-check li { display: flex; gap: 8px; font-size: 14px; color: rgba(255,255,255,0.85); }
  .bonus-check li::before { content: "✓"; color: #2ecc40; font-weight: 900; flex-shrink: 0; }

  /* ─── FAQ ────────────────────────────────────────────── */
  .faq-list { display: flex; flex-direction: column; gap: 2px; }
  .faq-item { border: 1px solid #1d1d1d; border-radius: 2px; overflow: hidden; }
  .faq-q {
    width: 100%; background: #0d0d0d;
    padding: 16px 20px; text-align: left;
    font-size: 15px; font-weight: 600; color: #fff;
    border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    transition: background 0.2s;
  }
  .faq-q:hover { background: #141414; }
  .faq-q .icon { color: #2ecc40; font-size: 22px; transition: transform 0.2s; flex-shrink: 0; margin-left: 12px; }
  .faq-q.open .icon { transform: rotate(45deg); }
  .faq-a {
    max-height: 0; overflow: hidden; background: #070707;
    transition: max-height 0.3s ease, padding 0.2s;
    font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.7;
  }
  .faq-a.open { max-height: 300px; padding: 16px 20px; }

  /* ─── SECTION TITLE HELPERS ──────────────────────────── */
  .sec-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(26px, 4vw, 42px); font-weight: 700;
    text-transform: uppercase; line-height: 1.1; margin-bottom: 12px;
  }
  .sec-title .green { color: #2ecc40; }
  .sec-title .red   { color: #e74c3c; }
  .sec-title .gold  { color: #f39c12; }

  .sec-tag {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: #2ecc40; margin-bottom: 14px; display: block;
    font-weight: 700;
  }

  .divider-green {
    border: none; height: 2px;
    background: linear-gradient(90deg, transparent, #2ecc40, transparent);
    margin: 40px auto; max-width: 400px;
  }

  /* ─── COUNTDOWN ──────────────────────────────────────── */
  .countdown { display: inline-flex; gap: 10px; align-items: center; margin-bottom: 28px; }
  .cd-cell { background: #111; border: 1px solid #222; border-radius: 4px; padding: 12px 16px; text-align: center; min-width: 64px; }
  .cd-num { font-family: 'Oswald', sans-serif; font-size: 34px; font-weight: 700; color: #e74c3c; line-height: 1; }
  .cd-lbl { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }
  .cd-sep { font-family: 'Oswald', sans-serif; font-size: 28px; color: #333; }

  /* ─── FOOTER ─────────────────────────────────────────── */
  footer { background: #040404; border-top: 1px solid #111; padding: 36px 0; text-align: center; }
  .footer-logo { font-family: 'Oswald', sans-serif; font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 10px; }
  .footer-logo span { color: #2ecc40; }
  .footer-links { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 16px; }
  .footer-links a { font-size: 12px; color: #444; text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: #2ecc40; }
  .footer-copy { font-size: 12px; color: #333; }

  /* ─── STICKY CTA (mobile) ────────────────────────────── */
  .sticky-bar {
    display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 300;
    background: #2ecc40; color: #000;
    font-family: 'Oswald', sans-serif; font-size: 17px; font-weight: 700;
    text-align: center; padding: 15px; text-transform: uppercase;
    letter-spacing: 0.04em; text-decoration: none;
    box-shadow: 0 -4px 20px rgba(46,204,64,0.45);
  }
  @media(max-width:720px) { .sticky-bar { display: block; } }

  /* ─── RESPONSIVE ─────────────────────────────────────── */
  @media(max-width:720px) {
    .days-grid, .price-grid, .creator-sec-layout { grid-template-columns: 1fr; }
    .vid-grid, .proof-wall, .tgrid { grid-template-columns: 1fr 1fr; }
    body { padding-bottom: 60px; }
    .bonus-box { padding: 28px 20px; }
  }
  @media(max-width:480px) {
    .vid-grid, .proof-wall, .tgrid { grid-template-columns: 1fr; }
  }

  /* ─── FADE IN ────────────────────────────────────────── */
  .fi { opacity:0; transform:translateY(18px); transition:opacity .5s ease, transform .5s ease; }
  .fi.vis { opacity:1; transform:none; }
`;

// ── DATA ──────────────────────────────────────────────────
const forWhoItems = [
  "Quieres tener tu primer embudo de ventas activo esta semana — aunque partas desde cero.",
  "Tienes un negocio o servicio pero no tienes un sistema claro para venderlo en automático.",
  "Ya intentaste hacerlo solo con tutoriales y no funcionó.",
  "Quieres resultados reales en horas, no teoría en meses.",
  "Aunque no tengas experiencia técnica, seguidores ni marca personal aún.",
];

const dayOneItems = [
  "Diagnóstico exprés de tu negocio: qué tienes, qué falta y qué oportunidad atacar primero.",
  "Definición de tu cliente ideal sin suposiciones — con método probado.",
  "Diseño del recorrido de compra paso a paso desde que te descubren hasta que pagan.",
  "Cómo vender tu servicio sin tener ni un solo seguidor ni post previo.",
  "Estructura del embudo que funciona incluso con cuentas desde cero.",
];

const dayTwoItems = [
  "★ Escritura del copy clave para cada etapa del embudo — lo hacemos en vivo juntos.",
  "Elección de herramientas según tu presupuesto y nivel técnico actual.",
  "Cómo obtener tus primeras ventas en los próximos 7 días.",
  "Plan de activación concreto con pasos diarios para lanzarlo esta semana.",
  "Sesión de preguntas en vivo para resolver cualquier duda antes de salir.",
];

const vidTestimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "LAURA HIZO", amount: "61 VENTAS / $552 USD"
  },
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "MARCOS LOGRÓ", amount: "93 VENTAS / $600 USD"
  },
  {
    img: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "PABLO ALCANZÓ", amount: "SUS PRIMERAS 40 VENTAS"
  },
];

const proofCards = [
  { name: "Charo Álvarez", amount: "$3,596 USD", text: "Primer mes usando el método. ROI 103% con inversión mínima en anuncios." },
  { name: "Ma. Elena Ramírez", amount: "$1,711 USD", text: "12 días de campaña: 50 carritos, 22 bump sales, 10 OTOs." },
  { name: "José Rivas", amount: "29.379 USD", text: "100% de su meta de noviembre. El embudo funcionó solo." },
  { name: "David de los Ríos", amount: "11K USD", text: "Finalizando fase 3 sin perder ni una sola campaña al 100%." },
  { name: "Espejo Rocío", amount: "$7,350 USD", text: "La prueba de que funciona incluso cuando el low ticket no despega." },
  { name: "Paula S.", amount: "$666 USD", text: "Embudo del cliente: 2 semanas, resultados consistentes." },
];

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: "★★★★★",
    text: <>En <span className="green">2 horas</span> tuve mi embudo listo. La semana siguiente hice <span className="green">3 ventas automatizadas</span> por primera vez.</>,
    name: "Daniela Ramos", role: "Coach de bienestar · Colombia"
  },
  {
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    stars: "★★★★★",
    text: <>Intenté solo por 6 meses. Esta sesión me mostró exactamente dónde fallaba. <span className="green">Recuperé la inversión en 48 horas.</span></>,
    name: "Marcos Torres", role: "Consultor B2B · México"
  },
  {
    img: "https://randomuser.me/api/portraits/women/26.jpg",
    stars: "★★★★★",
    text: <>Pensé que era muy pequeña para esto. Damián me demostró que <span className="green">cualquier negocio puede automatizar sus ventas</span>.</>,
    name: "Sofía Lara", role: "Diseñadora freelance · Argentina"
  },
];

const generalFeatures = [
  "Sesión 1 a 1 en vivo de 2 horas con Damián Velázquez",
  "Construcción en tiempo real de tu embudo completo",
  "Plan de activación de 7 días incluido",
  "Hoja de ruta personalizada a tu negocio",
  "Grabación disponible por 2 semanas",
  "Sesión de preguntas y respuestas al final",
];

const vipFeatures = [
  "Todo lo incluido en Entrada General",
  "★ Sesión adicional de auditoría de tu embudo (30 min)",
  "★ Plantilla de diseño rápido de landing page",
  "★ Grabaciones disponibles de forma permanente",
  "★ Acceso a comunidad privada de emprendedores",
  "★ Seguimiento por WhatsApp durante 7 días",
];

const faqs = [
  { q: "¿Necesito experiencia técnica para esto?", a: "No. La sesión está diseñada para emprendedores que empiezan. Elegimos herramientas simples y te explico cada paso en vivo." },
  { q: "¿Qué pasa si termina la sesión y no tengo mi embudo?", a: "Garantía total de 7 días. Si no construimos tu embudo, te devolvemos el 100% de tu inversión sin preguntas." },
  { q: "¿Cuándo puedo ver mis primeras ventas?", a: "Con el plan de activación de 7 días, muchos clientes reportan sus primeras ventas automatizadas en los primeros 10 días." },
  { q: "¿Qué necesito tener antes de la sesión?", a: "Solo necesitas saber qué vendes. No necesitas logo, web ni audiencia previa. Lo construimos desde cero." },
  { q: "¿Cuántos cupos hay disponibles?", a: "Acepto máximo 5 sesiones por semana. Cuando se llenen el siguiente bloque disponible puede ser en 1-2 semanas." },
];

// ── HOOKS ─────────────────────────────────────────────────
function useCountdown() {
  const [t, setT] = useState({ h: 23, m: 41, s: 58 });
  useEffect(() => {
    const id = setInterval(() => {
      setT(p => {
        let { h, m, s } = p;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useFadeIn() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".fi").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className={`faq-q${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        {q}<span className="icon">+</span>
      </button>
      <div className={`faq-a${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}

const pad = n => String(n).padStart(2, "0");

// ── APP ───────────────────────────────────────────────────
export default function App() {
  const time = useCountdown();
  useFadeIn();

  return (
    <>
      <style>{CSS}</style>

      {/* TOP ALERT */}
      <div className="topbar">
        ⚠️ Atención: Esta sesión es <span>100% EN VIVO</span> — no es un curso grabado.<br />
        Construimos tu embudo juntos, paso a paso. <span>Últimos cupos disponibles.</span>
      </div>

      {/* NAV */}
      <nav>
        <a href="#" className="logo">
          <div className="logo-icon">F</div>
          Funnel<span>Fast</span>
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap center">
          <div className="event-pill fi">
            <span className="dot" />
            <span><strong>SESIÓN EN VIVO</strong> · Cupos disponibles: <span className="slots">últimos lugares</span></span>
          </div>

          <h1 className="fi">
            Construye tu primer<br />
            <span className="red">embudo de ventas</span><br />
            <span className="green">(listo para vender)</span><br />
            <span className="white">en menos de 2 horas.</span>
          </h1>

          <div className="divider-green fi" />

          <p className="hero-sub fi">
            Y además te mostraré cómo <span className="green">VENDERLO y convertirlo en una máquina de clientes</span>
            {" "}para tener tu negocio digital <span className="red">completo y funcionando en automático</span>.
          </p>

          <div className="video-wrap fi">
            <div className="video-inner">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Persona trabajando con laptop en negocio digital"
              />
              <div className="play-btn">▶</div>
            </div>
          </div>

          <div style={{marginTop:36}} className="fi">
            <p style={{fontSize:12,color:"#555",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Este precio especial expira en:</p>
            <div className="countdown">
              <div className="cd-cell"><div className="cd-num">{pad(time.h)}</div><div className="cd-lbl">Horas</div></div>
              <span className="cd-sep">:</span>
              <div className="cd-cell"><div className="cd-num">{pad(time.m)}</div><div className="cd-lbl">Min</div></div>
              <span className="cd-sep">:</span>
              <div className="cd-cell"><div className="cd-num">{pad(time.s)}</div><div className="cd-lbl">Seg</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIG CLAIM ────────────────────────────────────── */}
      <section className="sec sec-dark fi">
        <div className="wrap center">
          <p className="big-claim lead" style={{fontSize:"clamp(16px,2vw,20px)"}}>
            Esta fue <em>mi simple estrategia</em> para facturar más de
          </p>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(52px,9vw,96px)",fontWeight:700,color:"#2ecc40",lineHeight:1,textShadow:"0 0 40px rgba(46,204,64,0.3)"}}>
            $200,000 USD
          </div>
          <p style={{fontSize:13,color:"#444",marginTop:8}}>ayudando a más de 200 emprendedores en 12 países a construir sus sistemas de venta</p>
          <div className="creator-photo-wrap fi" style={{maxWidth:420,margin:"32px auto 0"}}>
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Damián Velázquez — Estratega de embudos de ventas"
            />
            <div className="creator-badge">Damián Velázquez · Reconocimiento por + de 200 embudos construidos</div>
          </div>
          <p style={{color:"#2ecc40",fontWeight:700,marginTop:16,fontSize:15}}>
            ★ Lo logramos principalmente con sesiones 1 a 1 y sistemas de venta simples. ★
          </p>
        </div>
      </section>

      {/* ── FOR WHO ──────────────────────────────────────── */}
      <section className="sec sec-black">
        <div className="wrap">
          <p className="for-who-title center fi">¡ESTO ES PARA TI!</p>
          <ul className="check-red-list fi">
            {forWhoItems.map((item, i) => (
              <li className="check-red-item" key={i}>
                <div className="check-red-icon">✓</div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ────────────────────────────── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <p className="results-title fi">
            Ya ellos crearon su primer embudo DESDE CERO y<br />
            algunos YA lograron ventas en vivo dentro de la sesión.
          </p>
          <div className="vid-grid fi">
            {vidTestimonials.map((v, i) => (
              <div className="vid-card" key={i}>
                <div className="vid-thumb">
                  <img src={v.img} alt={v.name} />
                  <div className="vid-play">▶</div>
                </div>
                <div className="vid-caption">
                  <span className="red">{v.name}</span><br />
                  <span className="green">{v.amount}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:28}} className="fi">
            <a href="#reservar" className="btn-green" style={{display:"inline-block",width:"auto",padding:"14px 36px"}}>
              Mira más casos → 
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF WALL ────────────────────────────── */}
      <section className="sec sec-black">
        <div className="wrap">
          <p style={{textAlign:"center",marginBottom:24,color:"rgba(255,255,255,0.6)",fontSize:15}} className="fi">
            En 8 años hemos formado a cientos de personas con nuestros<br />sistemas de venta digital.
          </p>
          <div className="proof-wall fi">
            {proofCards.map((c, i) => (
              <div className="proof-card" key={i}>
                <div className="proof-card-name">{c.name}</div>
                <div className="proof-card-amount">{c.amount}</div>
                <div style={{marginTop:6,fontSize:12}}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ──────────────────────────────────────── */}
      <section className="sec sec-dark">
        <div className="wrap center">
          <p style={{color:"rgba(255,255,255,0.7)",marginBottom:8,fontSize:17}} className="fi">
            Lo que tendrás en esta sesión EN VIVO es ejecución real.<br />
            <strong>Por eso, no solo aprenderás: lo harás paso a paso.</strong>
          </p>
          <div className="divider-green" />
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(28px,5vw,48px)",fontWeight:700,color:"#2ecc40",marginBottom:24}} className="fi">
            Ventas reales en vivo
          </div>
          <p style={{color:"#2ecc40",fontWeight:700,fontSize:15,marginBottom:36}} className="fi">
            ✅ Somos el único programa del mercado donde construyes tu embudo<br />
            <span style={{color:"#e74c3c"}}>EN VIVO</span> y, además, puedes hacer ventas en vivo si eres seleccionado.
          </p>
        </div>
        <div className="wrap fi">
          <div className="days-grid">
            <div className="day-box">
              <div className="day-header red">Sesión | Parte 1</div>
              <div className="day-body">
                <ul className="day-list">
                  {dayOneItems.map((item, i) => (
                    <li className="day-list-item" key={i}><span className="day-bullet">›</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="day-box">
              <div className="day-header gold">Sesión | Parte 2</div>
              <div className="day-body">
                <ul className="day-list">
                  {dayTwoItems.map((item, i) => (
                    <li className="day-list-item" key={i}><span className="day-bullet">›</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATOR ──────────────────────────────────────── */}
      <section className="sec sec-black">
        <div className="wrap">
          <div className="creator-sec-layout fi">
            <div>
              <div className="creator-img-box">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Damián Velázquez — Estratega de embudos de ventas"
                />
                <div className="creator-green-stripe">Estratega de embudos · 8 años</div>
              </div>
            </div>
            <div>
              <span className="sec-tag">Quién te acompaña</span>
              <div className="creator-name">Damián<br /><span className="green">Velázquez.</span></div>
              <div className="creator-years">+ 8 años de experiencia</div>
              <p style={{color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:16,fontSize:15}}>
                Llevo <strong style={{color:"#fff"}}>más de 8 años</strong> construyendo sistemas de venta digital para emprendedores y pequeñas empresas. He acompañado a <strong style={{color:"#2ecc40"}}>más de 200 negocios en 12 países</strong> a diseñar sus primeros embudos — desde coaches individuales hasta agencias de marketing.
              </p>
              <p style={{color:"rgba(255,255,255,0.65)",lineHeight:1.8,marginBottom:24,fontSize:15}}>
                El problema que veo siempre: buenos productos sin un sistema para venderlos. <strong style={{color:"#2ecc40"}}>Eso es exactamente lo que arreglamos juntos en 2 horas.</strong>
              </p>
              <div className="creator-stats">
                <div className="c-stat"><strong>200+</strong><span>negocios</span></div>
                <div className="c-stat"><strong>8 años</strong><span>experiencia</span></div>
                <div className="c-stat"><strong>12</strong><span>países</span></div>
                <div className="c-stat"><strong>★4.9</strong><span>rating</span></div>
              </div>
              <a href="#reservar" className="btn-green" style={{display:"inline-block",width:"auto",padding:"15px 32px"}}>
                Reservar mi sesión ahora →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <div className="center fi" style={{marginBottom:36}}>
            <span className="sec-tag">Resultados reales</span>
            <div className="sec-title">Lo que dicen quienes ya tienen<br/><span className="green">su embudo activo</span></div>
          </div>
          <div className="tgrid fi">
            {testimonials.map((t, i) => (
              <div className="tcard" key={i}>
                <div className="tcard-stars">{t.stars}</div>
                <p className="tcard-text">{t.text}</p>
                <div className="tcard-author">
                  <div className="tcard-av">
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUS ────────────────────────────────────────── */}
      <section className="sec sec-black">
        <div className="wrap center fi">
          <div style={{fontSize:48,marginBottom:16}}>💰</div>
          <div className="bonus-box">
            <div className="bonus-title">3 BONOS EXCLUSIVOS</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:12}}>
              Si reservas antes de que se agoten los cupos, recibirás:
            </div>
            <ul className="bonus-check">
              <li>Plantilla de embudo lista para copiar y adaptar</li>
              <li>Swipe file de copy para cada etapa del embudo</li>
              <li>Mini-guía de herramientas gratuitas para empezar hoy</li>
            </ul>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:12}}>
              Valor total de los bonos: <span style={{color:"#2ecc40",fontWeight:700}}>$97 USD — incluidos sin costo adicional</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────── */}
      <section className="sec sec-dark center">
        <div className="wrap fi">
          <div className="guarantee-badge">
            <div className="g-num">7</div>
            <div className="g-label">días de<br/>garantía</div>
          </div>
          <div className="sec-title center"><span className="red">GARANTÍA TOTAL</span></div>
          <p style={{color:"rgba(255,255,255,0.6)",maxWidth:520,margin:"16px auto 0",fontSize:15,lineHeight:1.8}}>
            Si al terminar la sesión no hemos construido tu embudo, o si en los próximos 7 días no estás satisfecho con los resultados, <strong style={{color:"#fff"}}>te devolvemos el 100% de tu inversión</strong> — sin preguntas, sin letra chiquita.
          </p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section className="sec sec-black" id="reservar">
        <div className="wrap">
          <div className="center fi" style={{marginBottom:36}}>
            <span className="sec-tag">Reserva tu lugar</span>
            <div className="sec-title">Elige tu <span className="green">entrada</span></div>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.5)",marginTop:8}}>Cupos limitados — el precio aumenta en los próximos días</p>
          </div>
          <div className="price-grid fi">
            {/* GENERAL */}
            <div className="price-card general">
              <div className="price-header general">ENTRADA GENERAL</div>
              <div className="price-body">
                <div className="price-sub">Valor</div>
                <div className="price-amount"><sup>$</sup>10</div>
                <div style={{textAlign:"center",fontSize:13,color:"#555",marginBottom:16}}>USD · Sesión 1 a 1 de 2 horas</div>
                <ul className="price-feature-list">
                  {generalFeatures.map((f, i) => (
                    <li className="price-feature" key={i}>
                      <span className="pf-icon">▪</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com" className="btn-red">Quiero Entrar</a>
                <p className="price-urgency">El precio aumenta en los próximos días</p>
              </div>
            </div>
            {/* VIP */}
            <div className="price-card vip">
              <div className="price-header vip">ENTRADA VIP ⭐</div>
              <div className="price-body">
                <div className="price-sub">Valor</div>
                <div className="price-amount"><sup>$</sup>47</div>
                <div style={{textAlign:"center",fontSize:13,color:"#666",marginBottom:16}}>USD · Todo incluido + extras VIP</div>
                <ul className="price-feature-list">
                  {vipFeatures.map((f, i) => (
                    <li className="price-feature" key={i}>
                      <span className="pf-icon">★</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com" className="btn-gold">Quiero Entrar</a>
                <p className="price-urgency">Disponible hasta agotarse los cupos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <div className="center fi" style={{marginBottom:32}}>
            <span className="sec-tag">Preguntas frecuentes</span>
            <div className="sec-title">Resolvemos tus <span className="green">dudas</span></div>
          </div>
          <div className="faq-list fi">
            {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="sec sec-black center">
        <div className="wrap fi">
          <div className="sec-title"><span className="red">¿Listo para tener</span><br/>tu embudo<br/><span className="green">esta semana?</span></div>
          <p style={{fontSize:17,color:"rgba(255,255,255,0.6)",maxWidth:480,margin:"16px auto 32px",lineHeight:1.8}}>
            Una inversión de $10 USD que puede cambiar cómo vendes para siempre.<br/>
            <strong style={{color:"#fff"}}>Las plazas son limitadas y el precio sube pronto.</strong>
          </p>
          <a href="#reservar" className="btn-green" style={{display:"inline-block",width:"auto",padding:"18px 48px",fontSize:20}}>
            ✅ QUIERO MI EMBUDO AHORA →
          </a>
          <p style={{marginTop:16,fontSize:13,color:"#333"}}>🛡️ Garantía de 7 días · Sin contratos · Sin letra chiquita</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer>
        <div className="footer-logo">Funnel<span>Fast</span></div>
        <div className="footer-links">
          <a href="#">Política de privacidad</a>
          <a href="#">Términos de uso</a>
          <a href="#">Contacto</a>
          <a href="#reservar">Reservar sesión</a>
        </div>
        <p className="footer-copy">© 2026 FunnelFast · Damián Velázquez. Todos los derechos reservados.</p>
      </footer>

      {/* STICKY MOBILE CTA */}
      <a href="#reservar" className="sticky-bar">✅ Reservar sesión — $10 USD →</a>
    </>
  );
}