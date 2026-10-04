import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Sparkles } from 'lucide-react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionVenue = () => {
  const { event } = invitationData;

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${invitationData.couple.groom.name} & ${invitationData.couple.bride.name} — Engagement Ceremony`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Engagement Ceremony of Prathamesh & Revati.\n\nDate: 24 October 2026\nTime: 11:00 AM IST\nVenue: Royal Palace, Sangli\nAddress: ${event.address}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    const dates = '20261024T053000Z/20261024T103000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ICS calendar file
  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Prathamesh and Revati//Engagement Ceremony//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@prathamesh-revati.in',
      'DTSTAMP:20260927T000000Z',
      'DTSTART:20261024T053000Z',
      'DTEND:20261024T103000Z',
      'SUMMARY:Prathamesh & Revati — Engagement Ceremony',
      `DESCRIPTION:Engagement Ceremony of Prathamesh and Revati at ${event.venue}, Sangli.`,
      `LOCATION:${event.venue}, ${event.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Prathamesh_Revati_Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="venue"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-royal-jaali-light"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            The Destination
          </span>
          <h2 className="font-royal text-2xl sm:text-5xl font-bold text-burgundy-950">
            Where We Celebrate
          </h2>
          <FloralDivider className="my-2 sm:my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-sm sm:text-lg">
            "An auspicious palace setting filled with warmth, grandeur, and celebration."
          </p>
        </div>

        {/* Venue Grand Card with Champagne Parchment Gradient */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-stretch rounded-3xl border-2 border-gold-400 shadow-royal-card overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
          }}
        >
          {/* Palace Illustration / Art Side */}
          <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[320px] lg:min-h-full overflow-hidden">
            <img
              src={event.venueImage || "/assets/images/royal_palace_venue.jpg"}
              alt="Royal Palace Sangli Venue"
              loading="lazy"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(35, 4, 10, 0.1) 0%, transparent 40%, rgba(35, 4, 10, 0.9) 100%)',
              }}
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-ivory-50">
              <span className="font-sanskrit text-gold-300 text-[11px] sm:text-xs block">॥ सोहळ्याचे भव्य स्थळ ॥</span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-gold-200">{event.venue}</h3>
              <p className="font-serif text-[11px] sm:text-xs text-ivory-200/80 mt-0.5">Sangli, Maharashtra</p>
            </div>
          </div>

          {/* Details & Action Side */}
          <div className="lg:col-span-6 p-5 sm:p-10 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-gold-400/40 text-gold-700 text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Venue & Landmark</span>
              </div>

              <h3 className="font-royal text-2xl sm:text-3xl font-bold text-burgundy-950">
                {event.venue}
              </h3>

              <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2 text-burgundy-900/90 text-xs sm:text-base leading-relaxed">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-burgundy-950">Address:</p>
                    <p>{event.address}</p>
                    <p className="text-[11px] sm:text-xs text-gold-700 italic mt-0.5">Landmark: {event.landmark}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-burgundy-950">Ceremony Time:</p>
                    <p>{event.timeDetail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 sm:pt-6 border-t border-gold-300/40 space-y-2.5 sm:space-y-3">
              {/* Google Maps Button with Gold Metallic Gradient */}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl text-burgundy-950 font-royal font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 group touch-manipulation min-h-[48px]"
                style={{
                  background: 'linear-gradient(135deg, #ECC872 0%, #D4AF37 35%, #FFF0BD 65%, #AA8232 100%)',
                }}
              >
                <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              {/* Calendar Buttons Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-gold-200 hover:text-white border border-gold-500/40 text-[11px] sm:text-xs font-serif font-semibold transition-all shadow-sm active:scale-95 touch-manipulation min-h-[44px]"
                  style={{
                    background: 'linear-gradient(135deg, #3D0A14 0%, #200308 100%)',
                  }}
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Google Cal</span>
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-burgundy-950 hover:bg-gold-50 border border-gold-400 text-[11px] sm:text-xs font-serif font-semibold transition-all shadow-sm active:scale-95 touch-manipulation min-h-[44px]"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5EC 100%)',
                  }}
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  <span>Download .ICS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionVenue;
