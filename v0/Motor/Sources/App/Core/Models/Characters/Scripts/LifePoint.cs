using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Points;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts
{
    /// <summary>
    /// Uses it in health class, or to manage hit
    /// </summary>
    public class LifePoint : ValuePoint
    {
        #region Constructors
        public LifePoint(): base() { }

        public LifePoint(int currentValue = 0, int maxValue = 0) : base(currentValue, maxValue) { }
        #endregion
    }
}
