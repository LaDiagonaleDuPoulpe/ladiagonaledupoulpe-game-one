using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.CheckPoints
{
    /// <summary>
    /// Uses this interface to help the check point taker to get settings to save
    /// </summary>
    public interface IMemento
    {
        /// <summary>
        /// Generates the data to be saved in a checkpoint
        /// </summary>
        /// <returns></returns>
        CheckPointSetting GenerateMemento();
    }
}
