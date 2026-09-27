import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Sparkles } from 'lucide-react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionVenue = () => {
  const { event } = invitationData;

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${invitationData.couple.bride.name} & ${invitationData.couple.groom.name} — Engagement Ceremony`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Engagement Ceremony of Revati & Prathamesh.\n\nDate: 24 October 2026\nTime: 11:00 AM IST\nVenue: Royal Palace, Sangli\nAddress: ${event.address}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    // 20261024T053000Z to 20261024T103000Z (11:00 AM to 4:00 PM IST)
    const dates = '20261024T053000Z/20261024T103000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ICS calendar file
  const downloadIcsFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Revati and Prathamesh//Engagement Ceremony//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@revati-prathamesh.in',
      'DTSTAMP:20260927T000000Z',
      'DTSTART:20261024T053000Z',
      'DTEND:20261024T103000Z',
      'SUMMARY:Revati & Prathamesh — Engagement Ceremony',
      `DESCRIPTION:Engagement Ceremony of Revati and Prathamesh at ${event.venue}, Sangli.`,
      `LOCATION:${event.venue}, ${event.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Revati_Prathamesh_Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="venue" className="relative py-24 px-4 sm:px-6 md:px-12 bg-paper-texture overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            The Destination
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            Where We Celebrate
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "An auspicious palace setting filled with warmth, grandeur, and celebration."
          </p>
        </div>

        {/* Venue Grand Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl bg-[#FFFDF9] border-2 border-gold-400 shadow-royal-card overflow-hidden">
          {/* Palace Illustration / Art Side */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full overflow-hidden bg-burgundy-950">
            <img
              src="/assets/images/palace_arch.jpg"
              alt="Royal Palace Sangli Arch"
              loading="lazy"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
              <span className="font-sanskrit text-gold-300 text-xs block">॥ सोहळ्याचे भव्य स्थळ ॥</span>
              <h3 className="font-royal text-2xl font-bold text-gold-200">{event.venue}</h3>
              <p className="font-serif text-xs text-ivory-200/80 mt-0.5">Sangli, Maharashtra</p>
            </div>
          </div>

          {/* Details & Action Side */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-700 text-xs font-serif font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Venue & Landmark</span>
              </div>

              <h3 className="font-royal text-3xl font-bold text-burgundy-950">
                {event.venue}
              </h3>

              <div className="space-y-3 pt-2 text-burgundy-900/90 text-sm sm:text-base leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-burgundy-950">Address:</p>
                    <p>{event.address}</p>
                    <p className="text-xs text-gold-700 italic mt-0.5">Landmark: {event.landmark}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-burgundy-950">Ceremony Time:</p>
                    <p>{event.timeDetail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gold-300/40 space-y-3">
              {/* Google Maps Button */}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 text-burgundy-950 font-royal font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all duration-200 group"
              >
                <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>VIEW ON GOOGLE MAPS</span>
              </a>

              {/* Calendar Buttons Grid */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 text-gold-200 hover:bg-burgundy-950 border border-gold-500/40 text-xs font-serif font-semibold transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-burgundy-950 hover:bg-gold-50 border border-gold-400 text-xs font-serif font-semibold transition-colors shadow-sm"
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
