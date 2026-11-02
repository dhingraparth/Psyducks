import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Layers, 
  Car, 
  Bath, 
  SunMedium, 
  Wifi, 
  Zap, 
  Droplet, 
  Brush,
  ArrowRight
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function RentCalculator({
  onShowToast,
  isFullPage = false
}) {
  const [totalRent, setTotalRent] = useState(65000);
  const [tenantsCount, setTenantsCount] = useState(3);
  const [copied, setCopied] = useState(false);

  // Indian utility expenses
  const [wifiCost, setWifiCost] = useState(999);
  const [powerCost, setPowerCost] = useState(3800);
  const [waterCost, setWaterCost] = useState(2500);
  const [cleaningCost, setCleaningCost] = useState(4500); // Cook + Daily Maid

  // Tenant specifics in India
  const [tenantRooms, setTenantRooms] = useState([
    { id: 1, name: "Room 1 (Master + Attached Bath)", sqft: 280, privateBath: true, balcony: true, parking: true },
    { id: 2, name: "Room 2 (East Balcony Suite)", sqft: 220, privateBath: false, balcony: true, parking: false },
    { id: 3, name: "Room 3 (Courtyard Room)", sqft: 180, privateBath: false, balcony: false, parking: false },
    { id: 4, name: "Room 4 (Study Loft)", sqft: 160, privateBath: false, balcony: false, parking: false },
    { id: 5, name: "Room 5 (Studio Suite)", sqft: 150, privateBath: false, balcony: false, parking: false }
  ]);

  const updateTenant = (index, field, value) => {
    soundEngine.playClick();
    const updated = [...tenantRooms];
    updated[index] = { ...updated[index], [field]: value };
    setTenantRooms(updated);
  };

  const handleTenantsCountChange = (count) => {
    soundEngine.playClick();
    setTenantsCount(count);
  };

  const activeTenants = tenantRooms.slice(0, tenantsCount);

  // Calculate Fair Share in INR
  const calculations = useMemo(() => {
    const totalSqft = activeTenants.reduce((acc, t) => acc + Number(t.sqft), 0);
    const totalUtilities = wifiCost + powerCost + waterCost + cleaningCost;
    const perPersonUtility = Math.round(totalUtilities / tenantsCount);

    const weightedTenants = activeTenants.map((t) => {
      let weight = Number(t.sqft);
      if (t.privateBath) weight *= 1.18; // 18% premium for attached bath
      if (t.balcony) weight *= 1.08; // 8% premium for private balcony
      return { ...t, weight };
    });

    const totalWeight = weightedTenants.reduce((acc, t) => acc + t.weight, 0);

    const breakdown = weightedTenants.map((t) => {
      const rentShare = Math.round((t.weight / totalWeight) * totalRent);
      const parkingFee = t.parking ? 1500 : 0; // ₹1,500/mo parking spot
      const totalDue = rentShare + perPersonUtility + parkingFee;

      return {
        ...t,
        rentShare,
        utilityShare: perPersonUtility,
        parkingFee,
        totalDue,
        percentOfTotal: Math.round((t.weight / totalWeight) * 100)
      };
    });

    return {
      breakdown,
      totalUtilities,
      perPersonUtility,
      totalSqft
    };
  }, [activeTenants, totalRent, tenantsCount, wifiCost, powerCost, waterCost, cleaningCost]);

  const copyToClipboard = () => {
    soundEngine.playSuccess();
    const text = `CoHaven Fair-Share Rent Breakdown (INR):\nTotal Flat Rent: ₹${totalRent.toLocaleString('en-IN')}/mo\nShared Utilities: ₹${calculations.totalUtilities.toLocaleString('en-IN')}/mo (₹${calculations.perPersonUtility.toLocaleString('en-IN')}/person)\n\n` +
      calculations.breakdown.map(t => 
        `• ${t.name}: ₹${t.totalDue.toLocaleString('en-IN')}/mo (Base: ₹${t.rentShare.toLocaleString('en-IN')}, Utilities: ₹${t.utilityShare.toLocaleString('en-IN')}${t.parkingFee ? `, Parking: ₹${t.parkingFee}` : ''})`
      ).join('\n') + `\n\nGenerated via CoHaven India Fair-Share Engine (UPI Ready)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onShowToast) onShowToast("Fair-share breakdown copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="calculator" className={`bg-ivory dark:bg-charcoal-700 ${isFullPage ? 'min-h-screen pt-24 pb-20' : 'py-16 md:py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-terracotta/10 text-terracotta dark:bg-terracotta/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Fair-Share Living Algorithm (India)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-charcoal dark:text-ivory font-sans">
            Smart Rent & Utility Split Calculator
          </h2>
          <p className="text-sm sm:text-base text-charcoal-300 dark:text-charcoal-100">
            Eliminate awkward roommate negotiations in Bengaluru, Mumbai, or Delhi. Mathematically balance bedroom square footage, attached washrooms, private balconies, cook & maid charges so everyone pays their exact fair share.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Base Numbers Card */}
            <div className="glass-card p-6 rounded-3xl border border-ivory-300 dark:border-charcoal-500 space-y-5">
              <h3 className="text-base font-bold text-charcoal dark:text-ivory flex items-center gap-2">
                <span className="font-bold text-terracotta text-lg">₹</span>
                <span>Base Apartment Rent (INR)</span>
              </h3>

              {/* Total Rent Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-charcoal-300 dark:text-charcoal-200">Total Monthly Flat Rent</span>
                  <span className="text-base font-bold text-charcoal dark:text-ivory font-mono">
                    ₹{totalRent.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="150000"
                  step="1000"
                  value={totalRent}
                  onChange={(e) => setTotalRent(Number(e.target.value))}
                  className="w-full accent-terracotta cursor-pointer h-2 bg-ivory-300 dark:bg-charcoal-600 rounded-lg"
                />
              </div>

              {/* Number of Housemates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-charcoal-300 dark:text-charcoal-200">Housemates Sharing</span>
                  <span className="text-sm font-bold text-terracotta font-mono">{tenantsCount} Co-Tenants</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleTenantsCountChange(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tenantsCount === num
                          ? 'bg-charcoal text-ivory dark:bg-terracotta dark:text-white shadow-sm'
                          : 'bg-ivory-200/80 dark:bg-charcoal-600 text-charcoal-400 dark:text-charcoal-200 hover:bg-ivory-300'
                      }`}
                    >
                      {num} People
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shared Utility Expenses Card */}
            <div className="glass-card p-6 rounded-3xl border border-ivory-300 dark:border-charcoal-500 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-charcoal dark:text-ivory flex items-center gap-2">
                  <Zap className="w-4 h-4 text-sage" />
                  <span>Communal Utilities Pool</span>
                </h3>
                <span className="text-xs font-mono font-bold text-sage">
                  ₹{calculations.totalUtilities.toLocaleString('en-IN')}/mo total
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                  <div className="flex items-center gap-1.5 text-charcoal-300 dark:text-charcoal-200 mb-1">
                    <Wifi className="w-3.5 h-3.5 text-terracotta" />
                    <span>Airtel / Jio Fiber</span>
                  </div>
                  <div className="flex items-center font-mono font-bold text-charcoal dark:text-ivory">
                    <span className="text-charcoal-400 mr-1">₹</span>
                    <input
                      type="number"
                      value={wifiCost}
                      onChange={(e) => setWifiCost(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                  <div className="flex items-center gap-1.5 text-charcoal-300 dark:text-charcoal-200 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Electricity & AC</span>
                  </div>
                  <div className="flex items-center font-mono font-bold text-charcoal dark:text-ivory">
                    <span className="text-charcoal-400 mr-1">₹</span>
                    <input
                      type="number"
                      value={powerCost}
                      onChange={(e) => setPowerCost(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                  <div className="flex items-center gap-1.5 text-charcoal-300 dark:text-charcoal-200 mb-1">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                    <span>Maintenance & Water</span>
                  </div>
                  <div className="flex items-center font-mono font-bold text-charcoal dark:text-ivory">
                    <span className="text-charcoal-400 mr-1">₹</span>
                    <input
                      type="number"
                      value={waterCost}
                      onChange={(e) => setWaterCost(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-ivory-50 dark:bg-charcoal-600 border border-ivory-300 dark:border-charcoal-500">
                  <div className="flex items-center gap-1.5 text-charcoal-300 dark:text-charcoal-200 mb-1">
                    <Brush className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Cook & Daily Maid</span>
                  </div>
                  <div className="flex items-center font-mono font-bold text-charcoal dark:text-ivory">
                    <span className="text-charcoal-400 mr-1">₹</span>
                    <input
                      type="number"
                      value={cleaningCost}
                      onChange={(e) => setCleaningCost(Number(e.target.value))}
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-charcoal-300 dark:text-charcoal-200 bg-ivory-200/50 dark:bg-charcoal-600 p-2.5 rounded-xl">
                Equal per-person utility share: <span className="font-bold text-charcoal dark:text-ivory font-mono">₹{calculations.perPersonUtility.toLocaleString('en-IN')}/month</span>
              </div>
            </div>
          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Rent Distribution Bar */}
            <div className="glass-card p-6 rounded-3xl border border-ivory-300 dark:border-charcoal-500 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-charcoal dark:text-ivory">
                    Fair-Share Proportional Distribution
                  </h4>
                  <span className="text-xs text-charcoal-300 dark:text-charcoal-200">
                    Weighted by Sq Ft, Attached Bath (+18%), and Private Balcony (+8%)
                  </span>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-full bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal text-xs font-semibold hover:bg-charcoal-600 transition-all flex items-center gap-1.5 shadow-soft-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Stacked Colored Bar Chart */}
              <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-ivory-300">
                {calculations.breakdown.map((t, idx) => {
                  const colors = ['bg-terracotta', 'bg-sage', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
                  return (
                    <div
                      key={t.id}
                      style={{ width: `${t.percentOfTotal}%` }}
                      className={`${colors[idx % colors.length]} h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-mono font-bold`}
                      title={`${t.name}: ${t.percentOfTotal}% (₹${t.totalDue.toLocaleString('en-IN')})`}
                    >
                      {t.percentOfTotal > 12 && `${t.percentOfTotal}%`}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                {calculations.breakdown.map((t, idx) => {
                  const dotColors = ['bg-terracotta', 'bg-sage', 'bg-amber-600', 'bg-indigo-600', 'bg-rose-600'];
                  return (
                    <div key={t.id} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${dotColors[idx % dotColors.length]}`} />
                      <span className="text-charcoal-400 dark:text-charcoal-200 font-medium">
                        {t.name.split(' ')[0]}: <strong className="text-charcoal dark:text-ivory font-mono">₹{t.totalDue.toLocaleString('en-IN')}/mo</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Room Cards in INR */}
            <div className="space-y-3">
              {calculations.breakdown.map((tenant, idx) => (
                <div
                  key={tenant.id}
                  className="p-5 rounded-2xl glass-card border border-ivory-300 dark:border-charcoal-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Room specs & toggles */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-charcoal text-ivory text-xs font-bold flex items-center justify-center dark:bg-terracotta">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={tenant.name}
                        onChange={(e) => updateTenant(idx, 'name', e.target.value)}
                        className="font-bold text-sm text-charcoal dark:text-ivory bg-transparent border-b border-dashed border-ivory-300 dark:border-charcoal-400 focus:outline-none"
                      />
                    </div>

                    {/* Room Size Slider */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-charcoal-300 dark:text-charcoal-200">Room Size:</span>
                      <input
                        type="number"
                        value={tenant.sqft}
                        onChange={(e) => updateTenant(idx, 'sqft', Number(e.target.value))}
                        className="w-16 p-1 rounded-md border border-ivory-300 dark:border-charcoal-500 bg-white dark:bg-charcoal-600 text-charcoal dark:text-ivory font-mono text-center font-bold"
                      />
                      <span className="text-charcoal-300 dark:text-charcoal-200">sq ft</span>
                    </div>

                    {/* Amenity Feature Toggles */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => updateTenant(idx, 'privateBath', !tenant.privateBath)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all ${
                          tenant.privateBath
                            ? 'bg-sage/15 border-sage text-sage font-semibold'
                            : 'border-ivory-300 dark:border-charcoal-500 text-charcoal-300 dark:text-charcoal-200'
                        }`}
                      >
                        <Bath className="w-3 h-3" />
                        <span>Attached Bath (+18%)</span>
                      </button>

                      <button
                        onClick={() => updateTenant(idx, 'balcony', !tenant.balcony)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all ${
                          tenant.balcony
                            ? 'bg-terracotta/15 border-terracotta text-terracotta font-semibold'
                            : 'border-ivory-300 dark:border-charcoal-500 text-charcoal-300 dark:text-charcoal-200'
                        }`}
                      >
                        <SunMedium className="w-3 h-3" />
                        <span>Private Balcony (+8%)</span>
                      </button>

                      <button
                        onClick={() => updateTenant(idx, 'parking', !tenant.parking)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border flex items-center gap-1 transition-all ${
                          tenant.parking
                            ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                            : 'border-ivory-300 dark:border-charcoal-500 text-charcoal-300 dark:text-charcoal-200'
                        }`}
                      >
                        <Car className="w-3 h-3" />
                        <span>Parking (+₹1,500)</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Price output in INR */}
                  <div className="text-right sm:border-l sm:border-ivory-300 sm:dark:border-charcoal-500 sm:pl-6 shrink-0">
                    <div className="text-2xl font-bold text-charcoal dark:text-ivory font-mono">
                      ₹{tenant.totalDue.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-charcoal-300 dark:text-charcoal-200">/mo</span>
                    </div>
                    <div className="text-[11px] text-charcoal-300 dark:text-charcoal-200 space-y-0.5 mt-1 font-mono">
                      <div>Rent: ₹{tenant.rentShare.toLocaleString('en-IN')}</div>
                      <div>Utilities: ₹{tenant.utilityShare.toLocaleString('en-IN')}</div>
                      {tenant.parkingFee > 0 && <div>Parking: ₹{tenant.parkingFee.toLocaleString('en-IN')}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
