import React from 'react';
import { CitySearchDropdown, SearchLocation } from '@/Components/CitySearchDropdown';

const getDefaultLocations = () =>
  ['London', 'Birmingham', 'Dublin'].map((cityName) => ({
    name: cityName,
    slug: cityName.toLowerCase(),
    type: 'city' as const,
  }));

type HeroProps = {
  locations: SearchLocation[];
};

export const Hero = ({ locations }: HeroProps) => (
  <div className="container flex mt-14 mb-24 gap-8 justify-evenly items-center">
    <div>
      <h1 className="text-4xl font-bold max-w-[500px]">
        Helping educate students across the globe
      </h1>
      <CitySearchDropdown
        locations={locations}
        defaultLocations={getDefaultLocations()}
        onSelect={(location) => {
          window.location.href = `/${location.type}/${location.slug}`;
        }}
      />
    </div>
    <img className="w-[429px] h-[330px]" src="/images/home-hero.png" alt="hero" />
  </div>
);
