<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string("name", 255);
            $table->string("email", 45);
            $table->string("password", 75);
            $table->enum("role", ["admin", "manager", "internal_user", "external_user"]);
            $table->string("phone_number", 25);
            $table->string("iban", 34);
            $table->integer("address_id");
            $table->integer("invoice_address_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
