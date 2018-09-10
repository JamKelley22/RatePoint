package com.djwelu.demo1exp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.os.Handler;
import android.os.SystemClock;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    TextView timeview;
    Button startbutton, stopbutton;
    Handler hand;
    long startTime, stopTime, ms;
    boolean stateCounting = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        timeview = (TextView) findViewById(R.id.timeview);
        startbutton = (Button) findViewById(R.id.startbutton);
        stopbutton = (Button) findViewById(R.id.stopbutton);
        hand = new Handler();

        startbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startTime = SystemClock.uptimeMillis();
                stateCounting = true;
                hand.postDelayed(runnable, 0);
            }
        });

        stopbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopTime = SystemClock.uptimeMillis();
                stateCounting = false;
            }
        });
    }

    public Runnable runnable = new Runnable() {
        public void run() {
            if(stateCounting) {
                ms = SystemClock.uptimeMillis() - startTime;
            }
            int sec = (int)ms/1000;
            int min = sec/60;
            sec = sec%60;
            timeview.setText(String.format("%02d",min)+":"+String.format("%02d",sec));
            hand.postDelayed(this,0);
        }
    };

}
