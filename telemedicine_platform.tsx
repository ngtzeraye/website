import React, { useState, useEffect } from 'react';
import { 
  Video, Calendar, User, Shield, Activity, Clock, Star, 
  Search, Menu, X, ChevronRight, CheckCircle2, Mic, MicOff, 
  Video as VideoIcon, VideoOff, PhoneOff, MessageSquare, 
  FileText, LogOut, Bell, HeartPulse
} from 'lucide-react';

// --- MOCK DATA ---
const DOCTORS = [
  { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: 4.9, reviews: 128, price: "$150", availability: "Available Today", bg: "bg-blue-100", color: "text-blue-600" },
  { id: 2, name: "Dr. Michael Chen", specialty: "General Practitioner", rating: 4.8, reviews: 342, price: "$80", availability: "Available in 30 mins", bg: "bg-emerald-100", color: "text-emerald-600" },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatologist", rating: 4.7, reviews: 89, price: "$120", availability: "Available Tomorrow", bg: "bg-purple-100", color: "text-purple-600" },
  { id: 4, name: "Dr. James Wilson", specialty: "Pediatrician", rating: 4.9, reviews: 412, price: "$100", availability: "Available Today", bg: "bg-orange-100", color: "text-orange-600" },
  { id: 5, name: "Dr. Anita Patel", specialty: "Neurologist", rating: 4.6, reviews: 76, price: "$200", availability: "Available Friday", bg: "bg-indigo-100", color: "text-indigo-600" },
  { id: 6, name: "Dr. David Kim", specialty: "Psychiatrist", rating: 4.8, reviews: 156, price: "$140", availability: "Available Today", bg: "bg-rose-100", color: "text-rose-600" }
];

export default function App() {
  const [view, setView] = useState('home'); // home, doctors, dashboard, call, booking
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "Alex Johnson", isLoggedIn: true });
  const [appointments, setAppointments] = useState([
    { id: 101, doctor: DOCTORS[1], date: "Today", time: "14:30 PM", status: "upcoming" }
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const navigate = (newView) => {
    setView(newView);
    setIsMobileMenuOpen(false);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    navigate('booking');
  };

  const confirmBooking = (date, time) => {
    const newAppointment = {
      id: Math.floor(Math.random() * 10000),
      doctor: selectedDoctor,
      date: date || "Tomorrow",
      time: time || "10:00 AM",
      status: "upcoming"
    };
    setAppointments([...appointments, newAppointment]);
    navigate('dashboard');
  };

  const joinCall = (appointment) => {
    setActiveCall(appointment);
    navigate('call');
  };

  const endCall = () => {
    setActiveCall(null);
    navigate('dashboard');
  };

  // --- COMPONENTS ---

  const Navbar = () => (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <HeartPulse className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">CareConnect</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('home')} className={`text-sm font-medium ${view === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <button onClick={() => navigate('doctors')} className={`text-sm font-medium ${view === 'doctors' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Find a Doctor</button>
            {user.isLoggedIn && (
              <button onClick={() => navigate('dashboard')} className={`text-sm font-medium ${view === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</button>
            )}
            
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-200 pl-4">
              {user.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Bell className="h-5 w-5" />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm cursor-pointer border border-blue-200" onClick={() => navigate('dashboard')}>
                    {user.name.charAt(0)}
                  </div>
                </div>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Log In
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button onClick={() => navigate('home')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Home</button>
          <button onClick={() => navigate('doctors')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Find a Doctor</button>
          {user.isLoggedIn && (
            <button onClick={() => navigate('dashboard')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Dashboard</button>
          )}
        </div>
      )}
    </nav>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-50 mb-6 w-max">
                <Activity className="h-4 w-4 mr-2" /> 24/7 Telehealth Services
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Quality healthcare</span>{' '}
                <span className="block text-blue-600 xl:inline">from your home.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Connect with board-certified doctors, therapists, and medical experts via secure video consultations. Get prescriptions, advice, and care instantly.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('doctors')} className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg shadow-lg shadow-blue-200 transition-all">
                  Find a Doctor
                </button>
                <button onClick={() => navigate('dashboard')} className="w-full sm:w-auto px-8 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-sm transition-all flex items-center justify-center">
                  <Video className="h-5 w-5 mr-2 text-gray-500" /> Test Device
                </button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden bg-gray-100 aspect-[4/3] flex items-center justify-center group cursor-pointer border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 opacity-90"></div>
                {/* Abstract Hero Image Representation */}
                <div className="relative z-10 w-full h-full flex flex-col p-6 justify-between">
                  <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">Dr</div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Dr. Sarah Jenkins</div>
                        <div className="text-xs text-gray-500">Cardiologist • Online</div>
                      </div>
                    </div>
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Video className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="self-end bg-blue-600 text-white p-3 rounded-xl rounded-tr-none shadow-md max-w-[80%] mt-4">
                    <p className="text-sm">Hello Alex, your test results look great. How are you feeling today?</p>
                  </div>
                  
                  <div className="self-start bg-white p-3 rounded-xl rounded-tl-none shadow-md max-w-[80%] mt-2">
                    <p className="text-sm text-gray-700">Much better, thank you doctor. The new medication is helping.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to get healthcare
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Clock className="h-6 w-6 text-blue-600" />, title: "No Waiting Rooms", desc: "See a doctor in minutes, not days. Available 24/7 from anywhere." },
            { icon: <Shield className="h-6 w-6 text-blue-600" />, title: "Secure & Private", desc: "HIPAA compliant platform ensuring your medical data is completely safe." },
            { icon: <FileText className="h-6 w-6 text-blue-600" />, title: "Digital Prescriptions", desc: "Prescriptions sent instantly to your local pharmacy for easy pickup." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DoctorsView = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Find a Specialist</h1>
            <p className="text-gray-500 mt-1">Book an online consultation with top-rated doctors.</p>
          </div>
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search doctors, specialties..." 
              className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
          {["All Specialties", "General", "Cardiology", "Dermatology", "Pediatrics", "Neurology", "Psychiatry"].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col">
              <div className="flex items-start space-x-4">
                <div className={`h-16 w-16 rounded-2xl ${doc.bg} ${doc.color} flex items-center justify-center text-xl font-bold`}>
                  {doc.name.split(' ').map(n => n[0]).join('').replace('D', '')}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{doc.specialty}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium text-gray-700 mr-1">{doc.rating}</span>
                    <span>({doc.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex-1">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {doc.availability}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="h-4 w-4 mr-2 text-gray-400" />
                  Consultation fee: <span className="font-bold text-gray-900 ml-1">{doc.price}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 bg-white border border-blue-200 text-blue-600 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
                <button onClick={() => handleBookAppointment(doc)} className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                  Book Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingView = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('doctors')} className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back to Doctors
        </button>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-6">
              <div className={`h-20 w-20 rounded-2xl ${selectedDoctor?.bg || 'bg-blue-100'} ${selectedDoctor?.color || 'text-blue-600'} flex items-center justify-center text-2xl font-bold shadow-sm border border-white`}>
                {selectedDoctor?.name.split(' ').map(n => n[0]).join('').replace('D', '')}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">{selectedDoctor?.name}</h1>
                <p className="text-blue-600 font-medium text-lg">{selectedDoctor?.specialty}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Video className="h-4 w-4 mr-2" /> 45 min Video Consultation
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Date & Time</h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
              {['Today', 'Tomorrow', 'Thu 24', 'Fri 25', 'Sat 26'].map((day, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${i === 0 ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}>
                  <div className="text-xs uppercase font-semibold opacity-80 mb-1">{i === 0 || i === 1 ? ' ' : day.split(' ')[0]}</div>
                  <div className="text-sm font-bold">{i === 0 || i === 1 ? day : day.split(' ')[1]}</div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Available Slots</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {['09:00 AM', '10:30 AM', '13:00 PM', '14:30 PM', '15:00 PM', '16:30 PM'].map((time, i) => (
                <div key={i} className={`py-2 px-3 rounded-lg border text-center cursor-pointer text-sm font-medium transition-all ${i === 3 ? 'bg-blue-50 border-blue-300 text-blue-700 ring-2 ring-blue-500 ring-offset-1' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                  {time}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Consultation Details</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Consultation Fee</span>
                <span className="font-medium text-gray-900">{selectedDoctor?.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">Service Tax</span>
                <span className="font-medium text-gray-900">$5.00</span>
              </div>
              <div className="border-t border-gray-200 my-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-blue-600 text-lg">${parseInt(selectedDoctor?.price.replace('$', '') || 0) + 5}.00</span>
              </div>
            </div>

            <button 
              onClick={() => confirmBooking("Today", "14:30 PM")}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center"
            >
              Confirm Appointment
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">By booking, you agree to our Terms of Service & Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl border-4 border-white shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500">Manage your appointments and health records.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`h-12 w-12 rounded-xl ${apt.doctor.bg} ${apt.doctor.color} flex items-center justify-center font-bold text-lg`}>
                          {apt.doctor.name.split(' ').map(n => n[0]).join('').replace('D', '')}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{apt.doctor.name}</h3>
                          <p className="text-sm text-gray-500">{apt.doctor.specialty}</p>
                          <div className="flex items-center mt-1 text-sm text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md w-max">
                            <Calendar className="h-3 w-3 mr-1" /> {apt.date} at {apt.time}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => joinCall(apt)}
                        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-green-200 flex items-center justify-center animate-pulse-slow"
                      >
                        <Video className="h-4 w-4 mr-2" /> Join Call Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 text-gray-300 mb-3"><Calendar className="h-full w-full"/></div>
                  <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
                  <p className="text-gray-500 mt-1 mb-4">You don't have any consultations scheduled.</p>
                  <button onClick={() => navigate('doctors')} className="text-blue-600 font-medium hover:underline">Book an appointment</button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {[
                  { title: "Consultation Completed", desc: "Dr. James Wilson (Pediatrician)", date: "Oct 12, 2023", icon: <CheckCircle2 className="h-5 w-5 text-green-500"/> },
                  { title: "Prescription Added", desc: "Amoxicillin 500mg, 3 times a day", date: "Oct 12, 2023", icon: <FileText className="h-5 w-5 text-blue-500"/> },
                  { title: "Lab Results Uploaded", desc: "Complete Blood Count (CBC)", date: "Sep 28, 2023", icon: <Activity className="h-5 w-5 text-purple-500"/> }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                      {item.icon}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" /> 
                  <span className="font-medium">My Medical Records</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                </button>
                <button className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                  <Activity className="h-5 w-5 text-emerald-600 mr-3" /> 
                  <span className="font-medium">Test Results</span>
                  <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs font-bold">1 New</span>
                </button>
                <button className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                  <Shield className="h-5 w-5 text-purple-600 mr-3" /> 
                  <span className="font-medium">Insurance Details</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <HeartPulse className="h-32 w-32" />
              </div>
              <h2 className="text-lg font-bold mb-2 relative z-10">Need urgent care?</h2>
              <p className="text-blue-100 text-sm mb-4 relative z-10">Connect with an on-call physician within 5 minutes.</p>
              <button className="bg-white text-blue-600 w-full py-2.5 rounded-xl font-bold text-sm shadow-sm relative z-10 hover:bg-blue-50 transition-colors">
                Start Urgent Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VideoCallView = () => (
    <div className="h-screen w-full bg-gray-950 flex flex-col overflow-hidden relative">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 h-2 w-2 rounded-full animate-pulse"></div>
          <span className="text-white font-medium text-sm drop-shadow-md">04:23</span>
          <span className="text-gray-300 text-sm px-2 border-l border-gray-600">{activeCall?.doctor?.name || "Dr. Consultation"}</span>
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-medium flex items-center">
          <Shield className="h-3 w-3 mr-1 text-green-400" /> End-to-end Encrypted
        </div>
      </div>

      {/* Main Video Area (Doctor) */}
      <div className="flex-1 relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
        {/* Mock Doctor Image Placeholder */}
        <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center">
           <div className={`h-32 w-32 rounded-full ${activeCall?.doctor?.bg || 'bg-blue-900'} flex items-center justify-center text-4xl font-bold text-white shadow-2xl mb-4 border-4 border-gray-700`}>
             {activeCall?.doctor?.name.split(' ').map(n => n[0]).join('').replace('D', '') || 'DR'}
           </div>
           <p className="text-white text-xl font-medium animate-pulse">Connecting to audio/video...</p>
        </div>
      </div>

      {/* PIP Video Area (Patient) */}
      <div className="absolute bottom-24 right-4 w-32 h-48 sm:w-48 sm:h-64 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 z-10 flex items-center justify-center">
        <div className="text-gray-500 flex flex-col items-center">
          <User className="h-8 w-8 mb-2 opacity-50" />
          <span className="text-xs">You</span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-center items-center space-x-4 sm:space-x-6 z-20">
        <button className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur border border-gray-600 flex items-center justify-center text-white transition-all">
          <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur border border-gray-600 flex items-center justify-center text-white transition-all">
          <VideoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button 
          onClick={endCall}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-900/50 transition-all transform hover:scale-105"
        >
          <PhoneOff className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
        <button className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-800/80 hover:bg-gray-700 backdrop-blur border border-gray-600 flex items-center justify-center text-white transition-all">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 antialiased selection:bg-blue-200">
      {view !== 'call' && <Navbar />}
      
      <main>
        {view === 'home' && <HomeView />}
        {view === 'doctors' && <DoctorsView />}
        {view === 'booking' && <BookingView />}
        {view === 'dashboard' && <DashboardView />}
        {view === 'call' && <VideoCallView />}
      </main>

      {/* Simple Footer */}
      {view !== 'call' && (
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-gray-900 font-bold">
              <HeartPulse className="h-5 w-5 text-blue-600 mr-2" /> CareConnect
            </div>
            <p className="text-sm text-gray-500">© 2026 CareConnect Telehealth. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Support</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}