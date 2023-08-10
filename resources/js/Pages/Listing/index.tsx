import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Head } from '@inertiajs/react';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { BannerImages } from '@/Components/Room/BannerImages';
import { Amenity } from '@/Components/Room/Amenity';
import { BookingPeriod } from '@/Components/Room/BookingPeriod';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Banner } from '@/Components/Banner';
import { Footer } from '@/Layouts/Footer';

// eslint-disable-next-line import/no-named-as-default-member
dayjs.extend(customParseFormat);

const Listing = () => {
  const page = useTypedPage();
  const { room } = page.props;
  const { data } = room;
  const amenities = data.item.amenities.general;

  return (
    <>
      <Head title="Invitations" />
      <Banner />
      <HeaderNavigation />
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <BannerImages images={data.item.images} />
        <div className="flex justify-between mt-10">
          <div className="w-4/6">
            <div>
              <h2 className="text-5xl font-bold">{data.item.name}</h2>
              <p className="pt-2">
                at <span className="font-bold">{data.item.property.name}</span>,{' '}
                {data.item.address.city}
              </p>
            </div>
            <div className="mt-10">
              <h4 className="text-2xl font-extrabold uppercase">About the room</h4>
              <div
                dangerouslySetInnerHTML={{ __html: data.item.rich_description }}
                className="pt-5 max-w-[45rem]"
              />
            </div>
            <div className="mt-10">
              <h4 className="text-2xl font-extrabold uppercase">Amenities</h4>
              <div className="grid grid-cols-5 gap-4 pt-5">
                {amenities.length > 0 &&
                  amenities.map(
                    (amenity) =>
                      amenity.status && <Amenity amenity={amenity} key={amenity.label} />,
                  )}
              </div>
            </div>
          </div>
          <div className="w-2/6">
            <div className="bg-white rounded-lg shadow px-3 py-5">
              <p>
                From <span className="text-2xl font-bold">{data.item.price_range.min}</span> /week
              </p>
              <h4 className="mt-5 text-sm uppercase tracking-wide font-bold">
                Available booking periods
              </h4>
              {data.item.booking_periods.map((period) => (
                <BookingPeriod
                  key={period.id}
                  period={period}
                  operator_id={data.item.operator_id}
                  room_id={data.item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listing;