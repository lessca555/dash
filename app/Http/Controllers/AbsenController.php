<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsenController extends Controller
{
    public function index()
    {
        return Inertia::render('Dash/Absen/Absen');
    }

    public function get_absen()
    {
        return Inertia::render('Dash/Absen/AddAbsen');
    }

    public function test()
    {
        return Inertia::render('Dash/Test');
    }
}
