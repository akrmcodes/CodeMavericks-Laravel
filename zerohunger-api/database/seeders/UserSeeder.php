<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567890',
            'latitude' => 30.0444,
            'longitude' => 31.2357,
            'impact_score' => 1000,
            'status' => 'active',
        ]);
        $admin->assignRole('admin');

        // Donor user
        $donor = User::create([
            'name' => 'John Donor',
            'email' => 'donor@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567891',
            'latitude' => 30.0444,
            'longitude' => 31.2357,
            'impact_score' => 150,
            'status' => 'active',
        ]);
        $donor->assignRole('donor');

        // Volunteer user
        $volunteer = User::create([
            'name' => 'Jane Volunteer',
            'email' => 'volunteer@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567892',
            'latitude' => 30.0500,
            'longitude' => 31.2400,
            'impact_score' => 350,
            'status' => 'active',
        ]);
        $volunteer->assignRole('volunteer');

        // Recipient user
        $recipient = User::create([
            'name' => 'Sara Recipient',
            'email' => 'recipient@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567893',
            'latitude' => 30.0400,
            'longitude' => 31.2300,
            'impact_score' => 50,
            'status' => 'active',
        ]);
        $recipient->assignRole('recipient');

        // Additional donors and volunteers
        $donor2 = User::create([
            'name' => 'Ahmed Restaurant',
            'email' => 'donor2@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567894',
            'latitude' => 30.0600,
            'longitude' => 31.2500,
            'impact_score' => 500,
            'status' => 'active',
        ]);
        $donor2->assignRole('donor');

        $volunteer2 = User::create([
            'name' => 'Mike Driver',
            'email' => 'volunteer2@test.com',
            'password' => Hash::make('password'),
            'phone' => '+1234567895',
            'latitude' => 30.0300,
            'longitude' => 31.2200,
            'impact_score' => 720,
            'status' => 'active',
        ]);
        $volunteer2->assignRole('volunteer');

        $this->command->info('Test users created successfully!');
        $this->command->info('All passwords are: password');
    }
}
