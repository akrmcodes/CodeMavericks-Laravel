<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'create-donation',
            'view-donation',
            'claim-donation',
            'deliver-donation',
            'manage-users',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $donor = Role::create(['name' => 'donor']);
        $donor->givePermissionTo(['create-donation', 'view-donation']);

        $volunteer = Role::create(['name' => 'volunteer']);
        $volunteer->givePermissionTo(['view-donation', 'claim-donation', 'deliver-donation']);

        $recipient = Role::create(['name' => 'recipient']);
        $recipient->givePermissionTo(['view-donation']);

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $this->command->info('Roles and permissions created successfully!');
    }
}
