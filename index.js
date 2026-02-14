const { Telegraf } = require('telegraf');
const axios = require('axios');

const BOT_TOKEN = '7986872606:AAFrXkXFkLNd6jp9SnFpk4b_Xp8V5dQC2Mw'; // 💀 Private Repo Only!
const bot = new Telegraf(BOT_TOKEN);

// 1. WELCOME COMMAND
bot.start((ctx) => {
    ctx.reply('💀 SHADOW_OSINT V3 ACTIVE!\n\nMenu:\n/dox [nama/nik] - Infiltrasi Data\n/ip [address] - Lacak Lokasi IP\n/dork [query] - Cari File Rahasia\n/ping - Cek Koneksi');
});

// 2. IP LOOKUP (LACAK LOKASI TARGET)
bot.command('ip', async (ctx) => {
    const ip = ctx.message.text.split(' ')[1];
    if (!ip) return ctx.reply('❌ Masukkan IP! Contoh: /ip 8.8.8.8');

    try {
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        const d = res.data;
        ctx.reply(`📍 IP TRACKED!\n\nNegara: ${d.country}\nKota: ${d.city}\nISP: ${d.isp}\nLat/Lon: ${d.lat}, ${d.lon}`);
    } catch (e) { ctx.reply('💀 Gagal melacak IP!'); }
});

// 3. GOOGLE DORKING (CARI FILE BOCOR/PDF RAHASIA)
bot.command('dork', (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');
    if (!query) return ctx.reply('❌ Contoh: /dork "nik" filetype:xlsx');

    const dorkLink = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    ctx.reply(`🔍 DORK GENERATED! Klik untuk hasil:\n\n${dorkLink}`);
});

// 4. DOXXING SIMULATOR (DPT KPU BYPASS)
bot.command('dox', async (ctx) => {
    const target = ctx.message.text.split(' ')[1];
    if (!target) return ctx.reply('❌ Masukkan Nama/NIK!');

    ctx.reply(`🕵️ Sedang menyisir database nasional untuk: ${target}...`);
    
    // Di sini lu bisa integrasiin API DPT KPU atau database SQL dump lu
    setTimeout(() => {
        ctx.reply(`✅ DATA FOUND (SIMULASI):\n\nNama: ${target.toUpperCase()}\nStatus: Terverifikasi\nDatabase: 2024_RECAP_BOCOR`);
    }, 2000);
});

// --- [ VERCEL HANDLER ] ---
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
        } catch (err) { console.error(err); }
    }
    res.status(200).send('SHADOW OSINT IS WATCHING... 💀');
};
      
