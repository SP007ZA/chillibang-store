/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { FoodPairingsSection } from './components/FoodPairingsSection';
import { CraftStorySection } from './components/CraftStorySection';
import { Footer } from './components/Footer';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#111113] text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
        {/* Top Promotional Announcement */}
        <AnnouncementBar />

        {/* Global Navigation with 3-Zone Contract */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Hero Section reflecting the uploaded poster */}
          <HeroSection />

          {/* Product Showcase & Small Batch Catalog */}
          <ProductShowcase />

          {/* "Goes along with everything!" 5 Food Pairings */}
          <FoodPairingsSection />

          {/* Craft, Aromatics & Homemade Story */}
          <CraftStorySection />
        </main>

        {/* Footer with WhatsApp Direct Order Callout */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <WhatsAppOrderDrawer />
        <ProductDetailModal />
        <AdminPanelModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}
