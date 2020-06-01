using Godot;
using System;

public class LightSpark : StaticBody2D
{
    #region Fields
    private Tween _tween;
    private Light2D _light;

    private static RandomNumberGenerator __generator = new RandomNumberGenerator();
    #endregion

    #region Public methods
    public override void _Ready()
    {
        GD.Print("pickle !!");
        this._light = this.GetNode("Light2D") as Light2D;

        this.InitRandomLight();

    }
    #endregion

    #region Internal methods
    private void InitRandomLight() 
    {
        this._tween = new Tween();
        this.AddChild(this._tween);
        this.InitializeTween();
    }

    private void DefineLightEnergy() 
    {
        this._light.Energy = __generator.RandfRange(0, 2);
        this._tween.Stop(this);
        this.InitializeTween();
    }

    private void InitializeTween()
    {
        float time = __generator.RandfRange(0, 1);

        this._tween.InterpolateCallback(this, time, nameof(DefineLightEnergy));
        this._tween.Repeat = false;
        this._tween.Start();
    }
    #endregion
}
