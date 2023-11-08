<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenController extends Controller
{
    public function index()
    {
        return Inertia::render('Dash/Admin/Absen/Absen');
    }

    public function user()
    {
        return Inertia::render('Dash/User/Absen', );
    }

    public function get_absen()
    {
        return Inertia::render('Dash/User/AddAbsen');
    }

    public function test()
    {
        return Inertia::render('Dash/Test');
    }
}
