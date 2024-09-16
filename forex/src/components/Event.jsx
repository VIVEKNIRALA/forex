import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Event = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [impactFilter, setImpactFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getEventData();
    }, []);

    const getEventData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            console.log(response.data);
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilterChange = () => {
        let filtered = events;

        if (impactFilter) {
            filtered = filtered.filter(event => event.impact === impactFilter);
        }
        if (countryFilter) {
            filtered = filtered.filter(event => event.country === countryFilter);
        }
        if (currencyFilter) {
            filtered = filtered.filter(event => event.currency === currencyFilter);
        }
        if (searchQuery) {
            filtered = filtered.filter(event => event.event.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredEvents(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [impactFilter, countryFilter, currencyFilter, searchQuery]);

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Forex Trading Economic Events</h1>


            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-gray-300 w-1/2"
                    placeholder="Search by event name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>


            <div className="flex justify-center mb-8 space-x-6">

                <select
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-gray-300"
                    onChange={(e) => setImpactFilter(e.target.value)}
                    value={impactFilter}
                >
                    <option value="">All Impacts</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>


                <select
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-gray-300"
                    onChange={(e) => setCountryFilter(e.target.value)}
                    value={countryFilter}
                >
                    <option value="">All Countries</option>
                    {[...new Set(events.map(event => event.country))].map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>


                <select
                    className="p-3 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-gray-300"
                    onChange={(e) => setCurrencyFilter(e.target.value)}
                    value={currencyFilter}
                >
                    <option value="">All Currencies</option>
                    {[...new Set(events.map(event => event.currency))].map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>


            <div className="shadow-2xl rounded-lg overflow-hidden">
                <div className="overflow-auto max-h-[52rem]">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="sticky top-0 bg-gray-700 text-white">
                            <tr>
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6">Country</th>
                                <th className="py-4 px-6">Event</th>
                                <th className="py-4 px-6">Currency</th>
                                <th className="py-4 px-6">Previous</th>
                                <th className="py-4 px-6">Actual</th>
                                <th className="py-4 px-6">Change</th>
                                <th className="py-4 px-6">Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-8 px-6 text-center text-gray-500">
                                        No events found for the selected filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((event, index) => (
                                    <tr key={index} className="border-t bg-white hover:bg-gray-100 transition-all duration-200">
                                        <td className="py-4 px-6">{new Date(event.date).toLocaleString()}</td>
                                        <td className="py-4 px-6">{event.country}</td>
                                        <td className="py-4 px-6">{event.event}</td>
                                        <td className="py-4 px-6">{event.currency}</td>
                                        <td className="py-4 px-6">{event.previous}</td>
                                        <td className="py-4 px-6">{event.actual}</td>
                                        <td className="py-4 px-6">{event.change}</td>
                                        <td className={`py-4 px-6 text-center font-bold ${event.impact === 'High' ? 'text-red-600' : event.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                                            }`}>
                                            {event.impact}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Event;
