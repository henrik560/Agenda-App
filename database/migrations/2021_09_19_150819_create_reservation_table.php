<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->time("starttime");
            $table->time("endtime");
            $table->integer("space_id");
            $table->text("title");
            $table->text("description")->nullable();
            $table->enum("status", ["final", "request"]);
            $table->integer("reserved_by_user_id");
            $table->integer("approved_by_user_id")->nullable();
            $table->dateTime("approved_on")->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('reservation');
    }
}
